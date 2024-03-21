import { Tour } from "../entities/tour.entity";
export declare class TourFilterInput {
    location?: string;
    priceMin?: number;
    priceMax?: number;
    startDate?: string;
    endDate?: string;
    tagName?: string[];
    continent?: string[];
    country?: string[];
    activeValues?: boolean[];
    ispopular?: boolean;
}
export declare class GetFilteredToursResponse {
    tours: Tour[];
    totalCount: number;
}
