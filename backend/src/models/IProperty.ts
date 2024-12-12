import {IHouse} from "./IHouse";
import {IFlat} from "./IFlat";

export interface IProperty{
    id: number;
    flats: IFlat[];
    houses: IHouse[];
}