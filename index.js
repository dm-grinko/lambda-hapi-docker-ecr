'use strict';

require('dotenv').config();
const api = require('./api');
const { transformRequest, transformResponse } = require('hapi-lambda');

let server;

exports.handler = async event => {
    if (!server) {
        server = await api.init();
    }

    const request = transformRequest(event);
    const response = await server.inject(request);
    return transformResponse(response);
};