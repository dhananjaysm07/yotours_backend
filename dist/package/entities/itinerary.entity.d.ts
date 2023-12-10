import { PackageGeneral } from "./general.entity";
import { TextArray } from "./textarray.entity";
export declare class Itinerary {
    id: string;
    dayNumber: number;
    description: string;
    textArrays: TextArray[];
    packageGeneral: PackageGeneral;
}
