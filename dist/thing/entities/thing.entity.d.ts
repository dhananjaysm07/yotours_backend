import { Tag } from "src/tag/entities/tag.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
export declare class Thing {
    id: string;
    thingTitle: string;
    thingDescription: string;
    thingHyperlink: string;
    images: ImageEntity[];
    tag: Tag;
    destination: Destination;
}
