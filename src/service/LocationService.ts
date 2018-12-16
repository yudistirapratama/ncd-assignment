import {ILocationService} from './ILocationService';
import {singleton} from 'tsyringe/dist/decorators';
import {LinkStation} from '../model/LinkStation';

@singleton()
export class LocationService implements ILocationService {
    public async searchLinkStation(x: number, y: number, stations: LinkStation[]): Promise<LinkStation[]> {
        try {
            const linkStations = await this.analyseProximityToLinkStation(x, y, stations);
            return linkStations;
        } catch (error) {
            throw new Error(`Error in analyzing proximity to link stations: \n${error}`);
        }
    }

    /* step to solve best location service
    * 1. calculate distanceToDevice to each station based on phytagoras theorem
    * 2. compare distanceToDevice to reach
    * 3. calculate power */
    private async analyseProximityToLinkStation(x: number, y: number, stations: LinkStation[]): Promise<LinkStation[]> {
        return new Promise<any>((resolve, reject) => {
            let results;
            if (stations.length === 0) {
                reject(new Error(`No link stations data is provided for point (${x}, ${y})`));
            } else if (stations === undefined || stations === null) {
                reject(new Error (`Link stations data is null or undefined\n`));
            } else if (x === null || x === undefined || y === null || y === undefined) {
                reject(new Error(`x: ${x} and/or ${y} values is either undefined or null\n`));
            } else if (stations.length > 0) {
                const updatedStations = stations.map((station: LinkStation) => {
                    const stationEntry = new LinkStation();
                    stationEntry.id = station.id;
                    stationEntry.name = station.name;
                    stationEntry.x = station.x;
                    stationEntry.y = station.y;
                    stationEntry.reach = station.reach;
                    stationEntry.distanceToDevice = this.calculateDeviceToStationDistance(x, y, stationEntry);
                    stationEntry.power = this.calculatePower(stationEntry);

                    return stationEntry;
                });

                const maxPower = Math.max(...updatedStations.map((station) => station.power));
                maxPower > 0 ? results = updatedStations.filter((station) => station.power === maxPower) : results = [];

                resolve(results);
            }
        });
    }

    private calculateDeviceToStationDistance(x: number, y: number, station: LinkStation): number {
        const devicePosition =  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return Math.abs(devicePosition - Math.sqrt(Math.pow(station.x, 2) + Math.pow(station.y, 2)));
    }

    private calculatePower(station: LinkStation): number {
        let power;
        station.distanceToDevice > station.reach ? power = 0 : power = Math.pow(station.reach - station.distanceToDevice, 2);
        return power;
    }
}
