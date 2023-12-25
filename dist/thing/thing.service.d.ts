import { DataSource, Repository } from "typeorm";
import { Thing } from "./entities/thing.entity";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";
export declare class ThingService {
    private dataSource;
    private thingRepository;
    constructor(dataSource: DataSource, thingRepository: Repository<Thing>);
    createThing(createThingInput: CreateThingInput): Promise<Thing>;
    updateThing(updateThingInput: UpdateThingInput): Promise<Thing>;
    deleteThing(id: string): Promise<{
        id: string;
    }>;
    findAll(): Promise<Thing[]>;
    findOne(id: string): Promise<Thing>;
}
