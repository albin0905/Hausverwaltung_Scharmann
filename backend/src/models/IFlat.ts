import {IRoom} from "./IRoom";

export interface IFlat {
    name: string;
    floor: string;
    numberOfRooms : number;
    certainRooms: IRoom[];
    rent: boolean;
}