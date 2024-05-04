// package.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Package } from "./entities/holiday.entity";
import { PackageResolver } from "./holiday.resolver";
import { PackageService } from "./holiday.service";
import { DestinationModule } from "src/destination/destination.module";
// import { LocationData } from "./entities/location.entity";
// import { IntercityData } from "./entities/intercity.entity";
// import { HotelData } from "./entities/hotel.entity";
// import { SightSeeingData } from "./entities/sight.entity";
// import { DayWiseItinerary } from "./entities/itinerary.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Package]), DestinationModule],
  providers: [PackageResolver, PackageService],
})
export class PackageModule {}
