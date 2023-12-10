import { DataSource, QueryRunner, Repository } from "typeorm";
import { Destination } from "./entities/destination.entity";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
export declare class DestinationService {
    private dataSource;
    private destinationRepository;
    constructor(dataSource: DataSource, destinationRepository: Repository<Destination>);
    createDestination(createDestinationInput: CreateDestinationInput): Promise<Destination>;
    updateDestination(updateDestinationInput: UpdateDestinationInput): Promise<Destination>;
    findAllDestinations(): Promise<Destination[]>;
    findOneDestination(id: string): Promise<Destination | null>;
    deleteDestination(destinationId: string): Promise<boolean>;
    findDestinationsByIds(queryRunner: QueryRunner, ids: string[]): Promise<Destination[]>;
}
