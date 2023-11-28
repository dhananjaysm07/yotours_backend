import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DestinationModule } from "src/destination/destination.module";
import { Attraction } from "./entities/attraction.entity";
import { AttractionService } from "./attraction.service";
import { AttractionResolver } from "./attraction.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Attraction]), DestinationModule],
    providers: [AttractionService,AttractionResolver],
    exports: [AttractionService],
  })
  export class AttractionModule {}
