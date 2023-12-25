import { Thing } from "./entities/thing.entity";
import { ThingService } from "./thing.service";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";
export declare class ThingResolver {
    private readonly thingService;
    constructor(thingService: ThingService);
    createThing(createThingInput: CreateThingInput): Promise<Thing>;
    getThings(): Promise<Thing[]>;
    getThing(id: string): Promise<Thing>;
    updateThing(updateThingInput: UpdateThingInput): Promise<Thing>;
    deleteThing(id: string): Promise<{
        id: string;
    }>;
}
