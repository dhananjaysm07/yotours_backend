import { Destination } from "../destination/entities/destination.entity";
import { DestinationService } from "./destination.service";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
import { GetFilteredDestinationResponse } from "./dto/filter-destination-input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { ContinentDto, CountryAndContinent, CountryDto } from "./dto/country-continent.dto";
export declare class DestinationResolver {
    private readonly destinationService;
    constructor(destinationService: DestinationService);
    createDestination(createDestinationInput: CreateDestinationInput): Promise<Destination>;
    updateDestination(updateDestinationInput: UpdateDestinationInput): Promise<Destination>;
    getDestinations(): Promise<Destination[]>;
    getDestination(id: string): Promise<Destination | null>;
    getFilteredDestination(page: number, loadCount: number, filter: TourFilterInput): Promise<GetFilteredDestinationResponse>;
    deleteDestination(destinationId: string): Promise<boolean>;
    getCountries(): Promise<CountryDto[]>;
    getContinents(): Promise<ContinentDto[]>;
    getCountriesAndContinents(): Promise<CountryAndContinent[]>;
    getUniqueDestinationLocations(): Promise<string[]>;
}
