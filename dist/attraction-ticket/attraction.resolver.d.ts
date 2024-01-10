import { Attraction } from "./entities/attraction.entity";
import { AttractionService } from "./attraction.service";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
import { GetFilteredAttractionResponse } from "./entities/attraction-filter";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
export declare class AttractionResolver {
    private readonly attractionService;
    constructor(attractionService: AttractionService);
    createAttraction(createAttractionInput: CreateAttractionInput): Promise<Attraction>;
    getAttractions(): Promise<Attraction[]>;
    getAttraction(id: string): Promise<Attraction>;
    getFilteredAttractions(page: number, loadCount: number, filter: TourFilterInput): Promise<GetFilteredAttractionResponse>;
    updateAttraction(updateAttractionInput: UpdateAttractionInput): Promise<Attraction>;
    deleteAttraction(id: string): Promise<{
        id: string;
    }>;
}
