'use strict';

require('dotenv').config();

describe('getStations', () => {
    beforeEach(() => {
        jest.mock('../getData.js');
        jest.mock('../uploadFileToS3.js');
    });

    test('should return link, count, capacity, and originalCount', async() => {
        const { getStations } = require('../getStations');
        const result = await getStations(null, {
            request: {
                query: {
                    maxCapacity: 12,
                }
            }
        });

        expect(result).toEqual({
            link: 'https://dmitry-grinko.s3.amazonaws.com/station_information.csv',
            count: 211,
            capacity: 12,
            originalCount: 694
        });
    });

    test('should return "No data"', async() => {
        const { getStations } = require('../getStations');
        const result = await getStations(null, {
            request: {
                query: {
                    maxCapacity: 0,
                }
            }
        });

        expect(result).toEqual({
            message: "No data",
        });
    });
});