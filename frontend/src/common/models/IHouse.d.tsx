import {IFlat} from "./IFlat.d";

export interface IHouse {
    id: number;
    name: string;
    flats: IFlat[];
}