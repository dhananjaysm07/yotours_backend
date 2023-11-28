import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PackageGeneral } from "./entities/general.entity";
import { PackageGeneralService } from "./package.service";
import { PackageGeneralResolver } from "./package.resolver";
import { Highlight } from "./entities/highlight.entity";
import { Photo } from "./entities/photo.entity";
import { Itinerary } from "./entities/itinerary.entity";
import { LocationDetails } from "./entities/location.entity";
import { DestinationModule } from "src/destination/destination.module";
import { HotelDetails } from "./entities/hotel.entity";
import { Sight } from "./entities/sight.entity";
import { DateDetails } from "./entities/datedetails.entity";
import { TravelDate } from "./entities/travel-date.entity";
import { InterCity } from "./entities/intercity.entity";
import { HotelArray } from "./entities/hotelarray.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PackageGeneral,
      Highlight,
      Photo,
      Itinerary,
      LocationDetails,
      HotelDetails,
      Sight,
      InterCity,
      DateDetails,
      TravelDate,
    ]),
    DestinationModule,
  ],
  providers: [PackageGeneralService, PackageGeneralResolver],
})
export class PackageGeneralModule {}
