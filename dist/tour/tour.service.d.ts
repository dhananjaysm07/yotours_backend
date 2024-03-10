import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Tour } from "./entities/tour.entity";
import { CreateTourInput } from "./dto/create-tour.input";
import { UpdateTourInput } from "./dto/update-tour.input";
import { GenericService } from "src/global/filterQueryClass";
import { TourFilterInput } from "./dto/filter-tour-input";
export declare class TourService extends GenericService<Tour> {
    private dataSource;
    private tourRepository;
    constructor(dataSource: DataSource, tourRepository: Repository<Tour>);
    createTour(createTourInput: CreateTourInput): Promise<Tour>;
    protected applyFilters(queryBuilder: SelectQueryBuilder<Tour>, filter: TourFilterInput): void;
    updateTour(updateTourInput: UpdateTourInput): Promise<Tour>;
    deleteTour(id: string): Promise<{
        id: string;
    }>;
    activateTour(id: string): Promise<{
        id: string;
    }>;
    findAll(): Promise<Tour[]>;
    findOne(id: string): Promise<Tour>;
    getUniqueCountriesAndContinents(): Promise<{
        country: string;
        continent: string;
        tourCount: number;
    }[]>;
    getAllTourLocations(): Promise<string[]>;
}
