import { LocationDetails } from "./location.entity";
import { HotelArray } from "./hotelarray.entity";
export declare class HotelDetails {
    id: string;
    city: string;
    hotelName: string;
    rating: string;
    days: string;
    nights: string;
    hotelArrays: HotelArray[];
    locationDetails: LocationDetails;
}
