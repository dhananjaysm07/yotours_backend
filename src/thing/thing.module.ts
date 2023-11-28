import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thing } from "./entities/thing.entity";
import { ThingService } from "./thing.service";
import { ThingResolver } from "./thing.resolver";
import { DestinationModule } from "src/destination/destination.module";

@Module({
  imports: [TypeOrmModule.forFeature([Thing]), DestinationModule],
  providers: [ThingService, ThingResolver],
  exports: [ThingService],
})
export class ThingModule {}
