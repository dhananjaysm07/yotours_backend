import { Destination } from "../destination/entities/destination.entity";
import { DestinationService } from "./destination.service";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
export declare class DestinationResolver {
    private readonly destinationService;
    constructor(destinationService: DestinationService);
    createDestination(createDestinationInput: CreateDestinationInput): Promise<Destination>;
    updateDestination(updateDestinationInput: UpdateDestinationInput): Promise<Destination>;
    getDestinations(): Promise<Destination[]>;
    getDestination(id: string): Promise<Destination | null>;
    deleteDestination(destinationId: string): Promise<boolean>;
}
