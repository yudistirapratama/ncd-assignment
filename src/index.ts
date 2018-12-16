import {Device} from './model/Device';
import {stations} from './data/LinkStations';

// Device with proper link stations
const deviceA = new Device(0, 0, stations);
const deviceB = new Device(100, 100, stations);
const deviceC = new Device(15, 10, stations);
const deviceD = new Device(18, 18, stations);

const devices = [deviceA, deviceB, deviceC, deviceD];

Promise.all(devices.map((device) => {
    device.analyzeProximityToLinkStations()
        .then(device.printLocation)
        .catch((error) => console.log(error));
}));
