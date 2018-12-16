import {LinkStation} from '../model/LinkStation';

export let stations: LinkStation[] = [];

const stationA = new LinkStation();
stationA.id = 1;
stationA.name = 'LinkStation A';
stationA.x = 0;
stationA.y = 0;
stationA.reach = 10;

const stationB = new LinkStation();
stationB.id = 2;
stationB.name = 'LinkStation B';
stationB.x = 20;
stationB.y = 20;
stationB.reach = 5;

const stationC = new LinkStation();
stationC.id = 3;
stationC.name = 'LinkStation C';
stationC.x = 10;
stationC.y = 0;
stationC.reach = 12;

stations = [stationA, stationB, stationC];
