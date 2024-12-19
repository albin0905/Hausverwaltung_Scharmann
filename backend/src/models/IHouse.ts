import {IRoom} from "./IRoom";

export interface IHouse{
    id:number,
    name:string,
    floor: number,
    numberOfRooms: number,
    certainRoom: IRoom[]
    garden: boolean,
    garage: boolean
}