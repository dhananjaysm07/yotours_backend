import { HotelDetailsInput } from "./hotel.input";
import { IntercityTransfersInput } from "./intercity.input";
import { SightseeingInput } from "./sightseeing.input";
export declare class LocationDetailsInput {
    hotelDetails: HotelDetailsInput[];
    intercityTransfers: IntercityTransfersInput[];
    sights: SightseeingInput[];
    airportTransfer: boolean;
    localTransfer: boolean;
}
