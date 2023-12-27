import { Tour } from "src/tour/entities/tour.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Thing } from "src/thing/entities/thing.entity";
export declare class Destination {
    id: string;
    destinationName: string;
    continent: string;
    country: string;
    bannerImage: string;
    bannerHeading: string;
    description: string;
    isPopular: boolean;
    fromDate: string;
    toDate: string;
    fromOccasion: string;
    toOccasion: string;
    images: ImageEntity[];
    tag: Tag;
    tours: Tour[];
    attractions: Attraction[];
    things: Thing[];
}
