// image.resolver.ts
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { ImageEntity } from "./entities/image.entity";
import { ImageService } from "./image.service";

@Resolver(() => ImageEntity)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  
  // Define other mutations and queries as needed
}
