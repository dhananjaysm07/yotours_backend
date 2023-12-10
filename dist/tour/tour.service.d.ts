import { DataSource, Repository } from "typeorm";
import { Tour } from "./entities/tour.entity";
import { CreateTourInput } from "./dto/create-tour.input";
import { UpdateTourInput } from "./dto/update-tour.input";
export declare class TourService {
    private dataSource;
    private tourRepository;
    constructor(dataSource: DataSource, tourRepository: Repository<Tour>);
    createTour(createTourInput: CreateTourInput): Promise<Tour>;
    updateTour(updateTourInput: UpdateTourInput): Promise<Tour>;
    deleteTour(tourId: string): Promise<void>;
    findAll(): Promise<Tour[]>;
    findOne(id: string): Promise<Tour>;
}
