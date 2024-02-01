import { CreateTourInput } from "./dto/create-tour.input";
import { Tour } from "./entities/tour.entity";
import { TourService } from "./tour.service";
import { UpdateTourInput } from "./dto/update-tour.input";
import { TourFilterInput, GetFilteredToursResponse } from "./dto/filter-tour-input";
import { CountryAndContinent } from "src/destination/dto/country-continent.dto";
export declare class TourResolver {
    private readonly tourService;
    constructor(tourService: TourService);
    createTour(createTourInput: CreateTourInput): Promise<Tour>;
    updateTour(updateTourInput: UpdateTourInput): Promise<Tour>;
    getTours(): Promise<Tour[]>;
    getFilteredTours(page: number, loadCount: number, filter: TourFilterInput): Promise<GetFilteredToursResponse>;
    findOne(id: string): Promise<Tour>;
    deleteTour(id: string): Promise<{
        id: string;
    }>;
    activateTour(id: string): Promise<{
        id: string;
    }>;
    getCountriesAndContinentsForTours(): Promise<CountryAndContinent[]>;
}
