'use strict';

const got = require('got');
const { URL } = process.env;

const getData = async() => {
    try {
        const response = await got(URL);

        const { data } = JSON.parse(response.body);

        return data;

    } catch (error) {
        return error;
    }
};

exports.getData = getData;