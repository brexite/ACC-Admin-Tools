export enum CarTypeCategory {
    GT3 = 0,
    GT3Old = 1,
    GT4 = 2,
    CUP = 3,
    TCX = 4
}

export interface Car {
    key: string,
    value: number
}

export interface CarGroup {
    disabled?: boolean;
    category: string;
    cars: Car[];
}