'use strict';

const fs = require('fs');
const { UPLOAD_PATH, FILE_NAME } = process.env;

const saveFile = ({ header, records }) => {
    if (!fs.existsSync(UPLOAD_PATH)) {
        fs.mkdirSync(UPLOAD_PATH);
    }

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    // Assume our file < 512 Mb
    const csvWriter = createCsvWriter({ path: `${UPLOAD_PATH}/${FILE_NAME}`, header });
    return csvWriter.writeRecords(records);
};

exports.saveFile = saveFile;