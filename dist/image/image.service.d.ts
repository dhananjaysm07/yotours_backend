import { Repository } from "typeorm";
import { ImageEntity } from "./entities/image.entity";
export declare class ImageService {
    private readonly imageRepository;
    constructor(imageRepository: Repository<ImageEntity>);
}
