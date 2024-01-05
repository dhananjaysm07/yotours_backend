import { DataSource, Repository } from "typeorm";
import { PackageGeneral } from "./entities/general.entity";
import { Highlight } from "./entities/highlight.entity";
import { Photo } from "./entities/photo.entity";
import { CreatePackageGeneralInput } from "./dto/create-package.input";
import { Itinerary } from "./entities/itinerary.entity";
import { ItineraryInput } from "./dto/itinerary.input";
import { LocationDetails } from "./entities/location.entity";
import { LocationDetailsInput } from "./dto/location.input";
import { DestinationService } from "src/destination/destination.service";
export declare class PackageGeneralService {
    private dataSource;
    private packageGeneralRepository;
    private locationDetailsRepository;
    private highlightRepository;
    private photoRepository;
    private itineraryRepository;
    private destinationService;
    constructor(dataSource: DataSource, packageGeneralRepository: Repository<PackageGeneral>, locationDetailsRepository: Repository<LocationDetails>, highlightRepository: Repository<Highlight>, photoRepository: Repository<Photo>, itineraryRepository: Repository<Itinerary>, destinationService: DestinationService);
    create(createPackageGeneralInput: CreatePackageGeneralInput): Promise<PackageGeneral>;
    delete(id: string): Promise<string>;
    findOne(id: string): Promise<PackageGeneral>;
    addItineraries(id: string, itineraryInputs: ItineraryInput[]): Promise<string[]>;
    addLocationDetails(id: string, locationDetailsInput: LocationDetailsInput): Promise<LocationDetails>;
    findAll(page?: number, limit?: number): Promise<{
        items: PackageGeneral[];
        totalCount: number;
    }>;
    findOneWithItineraries(id: string): Promise<PackageGeneral>;
    findOneWithLocation(id: string): Promise<PackageGeneral>;
}
