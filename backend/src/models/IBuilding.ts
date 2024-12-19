import {IHouse} from "./IHouse";
import {IFlat} from "./IFlat";

export interface IBuilding {
    id: number;
    flats: IFlat[];
    houses: IHouse[];
}