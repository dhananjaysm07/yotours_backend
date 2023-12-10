import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Thing } from "src/thing/entities/thing.entity";
import { Tour } from "src/tour/entities/tour.entity";
export declare class ImageEntity {
    id: string;
    imageUrl: string;
    tour: Tour;
    attraction: Attraction;
    thing: Thing;
    destination: Destination;
}
