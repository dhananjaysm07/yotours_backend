import { Destination } from "../../destination/entities/destination.entity";
import { Highlight } from "./highlight.entity";
import { Photo } from "./photo.entity";
import { Itinerary } from "./itinerary.entity";
import { LocationDetails } from "./location.entity";
import { DateDetails } from "./datedetails.entity";
export declare class PackageGeneral {
    id: string;
    title: string;
    type: string;
    dates: DateDetails[];
    summary: string;
    createdAt: Date;
    updatedAt: Date;
    currentStep: number;
    destinations: Destination[];
    highlights: Highlight[];
    photos: Photo[];
    itineraries: Itinerary[];
    locationDetails: LocationDetails;
}
