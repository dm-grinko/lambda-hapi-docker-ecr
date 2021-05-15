'use strict';

const { getRecords } = require('../getRecords');
const { data, maxCapacity } = require('../__mocks__/data.mock');

describe('getRecords', () => {
    let firstRecord, records, header, count, originalCount;

    beforeAll(async() => {
        const result = await getRecords(data, maxCapacity);
        records = result.records;
        header = result.header;
        count = result.count;
        originalCount = result.originalCount;
        firstRecord = result.records[0];
    });

    test('should remove rental_uris', async() => {
        expect(firstRecord.rental_uris).toBeUndefined();
    });

    test('should remove rental_methods', async() => {
        expect(firstRecord.rental_methods).toBeUndefined();
    });

    test('should remove external_id', async() => {
        expect(firstRecord.external_id).toBeUndefined();
    });

    test('should remove station_id', async() => {
        expect(firstRecord.station_id).toBeUndefined();
    });

    test('should remove legacy_id', async() => {
        expect(firstRecord.legacy_id).toBeUndefined();
    });

    test('should have externalId', async() => {
        expect(firstRecord.externalId).not.toBeUndefined();
    });

    test('should have stationId', async() => {
        expect(firstRecord.stationId).not.toBeUndefined();
    });

    test('should have legacyId', async() => {
        expect(firstRecord.legacyId).not.toBeUndefined();
    });

    test('should have 13 header fields', async() => {
        expect(header.length).toBe(13);
    });

    test('should return two stations', async() => {
        expect(records.length).toBe(211);
    });

    test('should return count', async() => {
        expect(count).toBeDefined();
    });

    test('should return originalCount', async() => {
        expect(originalCount).toBeDefined();
    });
});