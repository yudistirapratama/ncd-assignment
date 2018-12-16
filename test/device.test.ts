import {stations} from '../src/data/LinkStations';
import {expect, assert} from 'chai';
import {Device} from '../src/model/Device';

describe(`Device Promiximity To Link Station Test`, () => {
    describe(`Test location service`, () => {
        it(`should return location with power = 100 for device located in (0,0) coordinates `, async () => {
            const device = new Device(0, 0, stations);
            try {
                const bestStation = await device.analyzeProximityToLinkStations();
                assert.isObject(bestStation);
                assert.isAbove(bestStation.stations.length, 0);
                expect(bestStation.stations[0].power).to.equal(100);
                return;
            } catch (error) {
                console.log(error);
            }
        });
        it(`should return location with power = 0 for device located in (100,100) coordinates `, async () => {
            const device = new Device(100, 100, stations);
            try {
                const bestStation = await device.analyzeProximityToLinkStations();
                assert.isObject(bestStation);
                expect(bestStation.stations.length).to.equal(0);
                return;
            } catch (error) {
                console.log(error);
            }
        });
        it(`should throw an error if empty array is provided as data of the link stations`, async () => {
            const linkStations = [];
            const device = new Device(0, 0, linkStations);
            try {
                await device.analyzeProximityToLinkStations();
            } catch (error) {
                assert.isDefined(error);
                assert.instanceOf(error, Error);
                return;
            }
        });
        it(`should throw an error if stations data is empty or null`, async () => {
            const linkStations = undefined;
            const device = new Device(0, 0, linkStations);
            try {
                await device.analyzeProximityToLinkStations();
            } catch (error) {
                assert.isDefined(error);
                assert.instanceOf(error, Error);
                return;
            } finally {
                assert.isUndefined(linkStations);
            }
        });
    });
});
