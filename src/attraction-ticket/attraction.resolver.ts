import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Attraction } from "./entities/attraction.entity";
import { AttractionService } from "./attraction.service";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionDestinationInput } from "./entities/update-att-destination.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";

@Resolver(() => Attraction)
export class AttractionResolver {
  constructor(private readonly attractionService: AttractionService) {}

  @Mutation(() => Attraction)
  createAttraction(
    @Args("createAttractionInput") createAttractionInput: CreateAttractionInput
  ) {
    return this.attractionService.createAttraction(createAttractionInput);
  }

  @Query(() => [Attraction])
  async getAttractions(): Promise<Attraction[]> {
    return this.attractionService.findAll();
  }

  @Query(() => Attraction)
  getAttraction(@Args("id") id: string) {
    return this.attractionService.findOne(id);
  }

  @Mutation(() => Attraction)
  async updateAttraction(
    @Args("updateAttractionInput")
    updateAttractionInput: UpdateAttractionInput
  ): Promise<Attraction> {
    return this.attractionService.updateAttraction(updateAttractionInput);
  }
  @Mutation(() => Attraction)
  deleteAttraction(@Args("id") id: string) {
    return this.attractionService.deleteAttraction(id);
  }

  // @Mutation()
  // async deleteAttraction(
  //   @Args("attractionId")
  //   attractionId: string
  // ): Promise<void> {
  //   return this.attractionService.deleteAttraction(attractionId);
  // }
}
