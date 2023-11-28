import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Destination } from "../destination/entities/destination.entity";
import { DestinationService } from "./destination.service";
import { DestinationResolver } from "./destination.resolver";
import { TagModule } from "src/tag/tag.module";
import { ImageModule } from "src/image/image.module";

@Module({
  imports: [TypeOrmModule.forFeature([Destination]),TagModule,ImageModule],
  providers: [DestinationService, DestinationResolver],
  exports:[DestinationService]
})
export class DestinationModule {}
