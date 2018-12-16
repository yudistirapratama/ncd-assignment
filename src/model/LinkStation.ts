export class LinkStation {
    public id: number;
    public name: string;
    public x: number;
    public y: number;
    public reach: number;
    public distanceToDevice: number;
    public power: number;

    constructor(id?: number, name?: string, x?: number, y?: number,
                reach?: number, distance?: number, power?: number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.reach = reach;
        this.distanceToDevice = distance;
        this.power = power;
    }
}
