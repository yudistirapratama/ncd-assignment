import {LinkStation} from '../model/LinkStation';

export interface ILocationService {
    searchLinkStation(x: number, y: number, stations: LinkStation[]): Promise<LinkStation[]>;
}
