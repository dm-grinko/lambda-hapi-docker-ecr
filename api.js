'use strict';

const Hapi = require('@hapi/hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const { getStations } = require('./functions/getStations');
const { PORT, TOKEN } = process.env;

module.exports = {
    init: async() => {
        const server = new Hapi.server({
            port: PORT,
            routes: { cors: true }
        });

        // https://github.com/johnbrett/hapi-auth-bearer-token
        await server.register(AuthBearer);

        server.auth.strategy('simple', 'bearer-access-token', {
            allowQueryToken: true,
            accessTokenName: 'token',
            validate: async(_, token) => {
                const isValid = token === TOKEN;
                const credentials = { token };
                return { isValid, credentials };
            }
        });

        server.auth.default('simple');

        server.route({
            method: 'GET',
            path: '/station',
            handler: getStations,
        });

        return server;
    },
};