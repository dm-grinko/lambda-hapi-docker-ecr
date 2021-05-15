'use strict';

const { getRecords } = require('./getRecords');
const { saveFile } = require('./saveFile');
const { uploadFileToS3 } = require('./uploadFileToS3');
const { getData } = require('./getData');
const { DEFAULT_CAPACITY } = process.env;

const getStations = async(_, h) => {
    try {
        const { maxCapacity = DEFAULT_CAPACITY } = h.request.query;

        const data = await getData();

        const { records, header, count, originalCount } = await getRecords(data, maxCapacity);

        if (count) {
            await saveFile({ header, records });

            const link = await uploadFileToS3();

            return {
                link,
                count,
                capacity: +maxCapacity,
                originalCount,
            };
        } else {
            return {
                message: 'No data',
            };
        }
    } catch (error) {
        return error;
    }
};

exports.getStations = getStations;