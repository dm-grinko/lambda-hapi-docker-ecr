'use strict';

const getRecords = async(data, maxCapacity) => {
    const records = [];

    if (!data || !data.stations || !data.stations.length) {
        return { count: null };
    }

    await data.stations.forEach(station => {
        if (station.capacity <= maxCapacity) {
            station.externalId = station.external_id;
            station.legacyId = station.legacy_id;
            station.stationId = station.station_id;
            delete station.rental_uris;
            delete station.rental_methods;
            delete station.external_id;
            delete station.legacy_id;
            delete station.station_id;
            records.push(station);
        }
    });

    if (!records.length) {
        return { count: null };
    }

    // Let's use the keys of the first item to get the CSV file's header
    const header = Object.keys(records[0]).map((key) => ({
        id: key,
        title: key,
    }));

    return {
        records,
        header,
        count: records.length,
        originalCount: data.stations.length,
    };
};

exports.getRecords = getRecords;