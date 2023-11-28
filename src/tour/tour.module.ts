import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tour } from "./entities/tour.entity";
import { DestinationModule } from "src/destination/destination.module";
import { TourService } from "./tour.service";
import { TourResolver } from "./tour.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Tour]), DestinationModule],
  providers: [TourService,TourResolver],
  exports: [TourService],
})
export class TourModule {}
