import { TravelDate } from "./travel-date.entity";
import { PackageGeneral } from "./general.entity";
export declare class DateDetails {
    id: string;
    bookingFromDate: string;
    bookingToDate: string;
    travelDates: TravelDate[];
    packageGeneral: PackageGeneral;
}
