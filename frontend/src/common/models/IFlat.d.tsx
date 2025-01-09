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
        other?: { [key: string]: number };
    };
    rentable: boolean;
}