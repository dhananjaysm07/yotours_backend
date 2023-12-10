import { Attraction } from "./entities/attraction.entity";
import { AttractionService } from "./attraction.service";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
export declare class AttractionResolver {
    private readonly attractionService;
    constructor(attractionService: AttractionService);
    createAttraction(createAttractionInput: CreateAttractionInput): Promise<Attraction>;
    getAttractions(): Promise<Attraction[]>;
    getAttraction(id: string): Promise<Attraction>;
    updateAttraction(updateAttractionInput: UpdateAttractionInput): Promise<Attraction>;
}
