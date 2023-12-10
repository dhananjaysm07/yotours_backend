import { PackageGeneral } from "./entities/general.entity";
import { PackageGeneralService } from "./package.service";
import { CreatePackageGeneralInput } from "./dto/create-package.input";
import { ItineraryInput } from "./dto/itinerary.input";
import { LocationDetailsInput } from "./dto/location.input";
import { LocationDetails } from "./entities/location.entity";
export declare class PackageGeneralResolver {
    private readonly packageGeneralService;
    constructor(packageGeneralService: PackageGeneralService);
    createPackageGeneral(createPackageGeneralInput: CreatePackageGeneralInput): Promise<PackageGeneral>;
    deletePackageGeneral(id: string): Promise<string>;
    getPackageGeneral(id: string): Promise<PackageGeneral>;
    getPackageGeneralWithItineraries(id: string): Promise<PackageGeneral>;
    addItineraryToPackage(packageId: string, itineraryInput: ItineraryInput[]): Promise<string[]>;
    addLocationDetailsToPackage(packageId: string, locationDetailsInput: LocationDetailsInput): Promise<LocationDetails>;
    getPackageGeneralWithLocationDetails(id: string): Promise<PackageGeneral>;
    getPackageWithItinerary(packageId: string): Promise<PackageGeneral>;
}
