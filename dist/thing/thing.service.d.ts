import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Thing } from "./entities/thing.entity";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GenericService } from "src/global/filterQueryClass";
export declare class ThingService extends GenericService<Thing> {
    private dataSource;
    private thingRepository;
    constructor(dataSource: DataSource, thingRepository: Repository<Thing>);
    createThing(createThingInput: CreateThingInput): Promise<Thing>;
    updateThing(updateThingInput: UpdateThingInput): Promise<Thing>;
    protected applyFilters(queryBuilder: SelectQueryBuilder<Thing>, filter: TourFilterInput): void;
    deleteThing(id: string): Promise<{
        id: string;
    }>;
    activateThing(id: string): Promise<{
        id: string;
    }>;
    findAllForCMS(): Promise<Thing[]>;
    findAll(): Promise<Thing[]>;
    findOne(id: string): Promise<Thing>;
}
