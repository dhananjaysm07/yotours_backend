// image.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEntity } from "./entities/image.entity";
import { ImageService } from "./image.service";
import { ImageResolver } from "./image.resolver";
@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])], // Ensure Tour is included if it's not in another module
  providers: [ImageService, ImageResolver],
  exports: [ImageService], // Export ImageService if it will be used outside this module
})
export class ImageModule {}
