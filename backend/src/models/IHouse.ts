import {IFlat} from "./IFlat";

export interface IHouse {
    id:number
    name: string;
    flats: IFlat[];
}