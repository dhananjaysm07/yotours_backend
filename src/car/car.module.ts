import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { CarService } from "./car.service";
import { CarResolver } from "./car.resolver";
import { DestinationModule } from "src/destination/destination.module";

@Module({
  imports: [TypeOrmModule.forFeature([Car]), DestinationModule],
  providers: [CarService, CarResolver],
  exports: [CarService],
})
export class CarModule {}
