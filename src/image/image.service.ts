// image.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageEntity } from "./entities/image.entity";
import { TourService } from "../tour/tour.service"; // Assuming there is a TourService
import { CreateTourImageDTO } from "./dto/create-tour-image.dto";
import { UpdateTourImageDTO } from "./dto/update-tour-image.dto";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  
  // Additional methods ...
}
