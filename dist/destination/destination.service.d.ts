import { DataSource, QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
import { Destination } from "./entities/destination.entity";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
import { GenericService } from "src/global/filterQueryClass";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { ContinentDto, CountryAndContinent, CountryDto } from "./dto/country-continent.dto";
export declare class DestinationService extends GenericService<Destination> {
    private dataSource;
    private destinationRepository;
    constructor(dataSource: DataSource, destinationRepository: Repository<Destination>);
    createDestination(createDestinationInput: CreateDestinationInput): Promise<Destination>;
    updateDestination(updateDestinationInput: UpdateDestinationInput): Promise<Destination>;
    protected applyFilters(queryBuilder: SelectQueryBuilder<Destination>, filter: TourFilterInput): void;
    findAllDestinations(): Promise<Destination[]>;
    findOneDestination(id: string): Promise<Destination | null>;
    deleteDestination(destinationId: string): Promise<boolean>;
    findDestinationsByIds(queryRunner: QueryRunner, ids: string[]): Promise<Destination[]>;
    getCountries(): Promise<CountryDto[]>;
    getContinents(): Promise<ContinentDto[]>;
    getCountriesAndContinents(): Promise<CountryAndContinent[]>;
}
