import {IRoom} from "./IRoom";

export interface IFlat {
    id:number;
    name: string;
    floor: string;
    numberOfRooms : number;
    certainRooms: IRoom[];
    rent: boolean;
}