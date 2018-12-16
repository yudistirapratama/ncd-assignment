import {injectable} from 'tsyringe/dist/decorators';
import {ILocationService} from '../service/ILocationService';
import {deviceServiceContainer as deviceService} from '../config/ContainerConfig';
import {LinkStation} from './LinkStation';

@injectable()
export class Device {
    public x: number;
    public y: number;
    public stations: LinkStation[];
    private deviceService: ILocationService = deviceService;

    constructor(x?: number, y?: number, stations?: LinkStation[]) {
        this.x = x;
        this.y = y;
        this.stations = stations;
    }

    public async analyzeProximityToLinkStations(): Promise<Device> {
       try {
           const results = await this.deviceService.searchLinkStation(this.x, this.y, this.stations);
           return new Device(this.x, this.y, results);
       } catch (error) {
           throw new Error(`Cannot analyze proximity to any link stations: ${error}`);
       }
    }

    public async printLocation(device: Device): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (device.stations === null || device.stations === undefined) {
                reject(new Error(`The link stations has null or undefined values`));
            } else if (device.x === null || device.y === null || device.x === undefined || device.y === undefined ) {
                reject(new Error(`Coordinates x and or y is either null or undefined`));
            } else if (device.stations.length > 0) {
                device.stations.forEach((station) => {
                    console.log(`Best link station from point (${device.x},${device.y}) is ${station.name} (${station.x}, ${station.y}), with power ${station.power.toFixed(2)})`);
                    resolve();
                });
            } else if (device.stations.length === 0) {
                console.log(`No link station within reach for point (${device.x}, ${device.y})`);
                resolve();
            }
        });
    }
}
