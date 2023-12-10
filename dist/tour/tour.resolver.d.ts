import { CreateTourInput } from "./dto/create-tour.input";
import { Tour } from "./entities/tour.entity";
import { TourService } from "./tour.service";
import { UpdateTourInput } from "./dto/update-tour.input";
export declare class TourResolver {
    private readonly tourService;
    constructor(tourService: TourService);
    createTour(createTourInput: CreateTourInput): Promise<Tour>;
    updateTour(updateTourInput: UpdateTourInput): Promise<Tour>;
    getTours(): Promise<Tour[]>;
    findOne(id: string): Promise<Tour>;
}
