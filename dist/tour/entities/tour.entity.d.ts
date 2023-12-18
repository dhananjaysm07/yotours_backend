import { Tag } from "src/tag/entities/tag.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
export declare class Tour {
    id: string;
    tourTitle: string;
    price: string;
    currency: string;
    location: string;
    tourHyperlink: string;
    tourBokunId: string;
    images: ImageEntity[];
    tag: Tag;
    destination: Destination;
}
