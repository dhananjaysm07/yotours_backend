import { DataSource, Repository } from "typeorm";
import { Attraction } from "./entities/attraction.entity";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
export declare class AttractionService {
    private dataSource;
    private attractionRepository;
    constructor(dataSource: DataSource, attractionRepository: Repository<Attraction>);
    createAttraction(createAttractionInput: CreateAttractionInput): Promise<Attraction>;
    updateAttraction(updateAttractionInput: UpdateAttractionInput): Promise<Attraction>;
    deleteAttraction(attractionId: string): Promise<void>;
    findAll(): Promise<Attraction[]>;
    findOne(id: string): Promise<Attraction>;
}
