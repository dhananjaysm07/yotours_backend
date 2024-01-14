import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Attraction } from "./entities/attraction.entity";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
import { GenericService } from "src/global/filterQueryClass";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
export declare class AttractionService extends GenericService<Attraction> {
    private dataSource;
    private attractionRepository;
    constructor(dataSource: DataSource, attractionRepository: Repository<Attraction>);
    createAttraction(createAttractionInput: CreateAttractionInput): Promise<Attraction>;
    protected applyFilters(queryBuilder: SelectQueryBuilder<Attraction>, filter: TourFilterInput): void;
    updateAttraction(updateAttractionInput: UpdateAttractionInput): Promise<Attraction>;
    deleteAttraction(id: string): Promise<{
        id: string;
    }>;
    findAll(): Promise<Attraction[]>;
    findOne(id: string): Promise<Attraction>;
    getUniqueCountriesAndContinents(): Promise<{
        country: string;
        continent: string;
        attractionCount: number;
    }[]>;
}
