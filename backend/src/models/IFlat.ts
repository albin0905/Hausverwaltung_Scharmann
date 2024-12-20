import {IRoom} from "./IRoom";

export interface IFlat {
    id: number;
    name: string;
    floor: number | string;
    numberOfRooms: number;
    certainRooms: {
        bathroom: number;
        toilets: number;
        kitchen: number;
        bedroom: number;
        balconies?: number;
        storageRooms?: number;
        other?: { [key: string]: number }; // For custom room types like "Büro"
    };
    rentable: boolean;
}