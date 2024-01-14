import { Destination } from "../entities/destination.entity";
export declare class GetFilteredDestinationResponse {
    destinations: Destination[];
    totalCount: number;
}
export declare class DestinationFilterInput {
    startDate?: string;
    endDate?: string;
    tagName?: string[];
    continent?: string[];
}
