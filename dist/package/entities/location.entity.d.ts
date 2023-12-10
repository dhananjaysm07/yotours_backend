import { PackageGeneral } from "./general.entity";
import { Sight } from "./sight.entity";
import { HotelDetails } from "./hotel.entity";
import { InterCity } from "./intercity.entity";
export declare class LocationDetails {
    id: string;
    hotelDetails: HotelDetails[];
    intercityTransfers: InterCity[];
    sights: Sight[];
    airportTransfer: boolean;
    localTransfer: boolean;
    packageGeneral: PackageGeneral;
}
