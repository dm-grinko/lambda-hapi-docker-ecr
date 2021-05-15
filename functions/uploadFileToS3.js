'use strict';

const fs = require('fs');
const mime = require('mime-types');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { UPLOAD_PATH, FILE_NAME, BUCKET_NAME } = process.env;

const uploadFileToS3 = () =>
    new Promise((resolve, reject) => {
        const path = `${UPLOAD_PATH}/${FILE_NAME}`;
        const fileContent = fs.createReadStream(path);
        const contentType = mime.lookup(path);

        const params = {
            Bucket: BUCKET_NAME,
            Key: FILE_NAME,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read',
        };

        // settings for automatic multipart uploads with concurrency and retries
        // https://aws.amazon.com/blogs/developer/announcing-the-amazon-s3-managed-uploader-in-the-aws-sdk-for-javascript/
        const options = {
            partSize: 10 * 1024 * 1024, // 10 megabyte chunks
            queueSize: 2 // concurrency
        };

        s3.upload(params, options, (err, data) => {
            if (err) {
                console.log('err', err);
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });

exports.uploadFileToS3 = uploadFileToS3;