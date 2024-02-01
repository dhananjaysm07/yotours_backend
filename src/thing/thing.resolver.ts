import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { Thing } from "./entities/thing.entity";
import { ThingService } from "./thing.service";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GetFilteredThingResponse } from "./dto/filter-thing-input";

@Resolver(() => Thing)
export class ThingResolver {
  constructor(private readonly thingService: ThingService) {}

  @Mutation(() => Thing)
  createThing(@Args("createThingInput") createThingInput: CreateThingInput) {
    return this.thingService.createThing(createThingInput);
  }

  @Query(() => [Thing])
  async getThings(): Promise<Thing[]> {
    return this.thingService.findAll();
  }

  @Query(() => [Thing])
  async getThingsForCMS(): Promise<Thing[]> {
    return this.thingService.findAllForCMS();
  }

  @Query(() => Thing)
  getThing(@Args("id") id: string) {
    return this.thingService.findOne(id);
  }

  @Mutation(() => Thing)
  async updateThing(
    @Args("updateThingInput")
    updateThingInput: UpdateThingInput
  ): Promise<Thing> {
    return this.thingService.updateThing(updateThingInput);
  }

  @Mutation(() => Thing)
  deleteThing(@Args("id") id: string) {
    return this.thingService.deleteThing(id);
  }

  @Mutation(() => Thing)
  activateThing(@Args("id") id: string) {
    return this.thingService.activateThing(id);
  }

  @Query(() => GetFilteredThingResponse)
  async getFilteredThings(
    @Args("page", { type: () => Int }) page: number,
    @Args("loadCount", { type: () => Int }) loadCount: number,
    @Args("filter") filter: TourFilterInput
  ): Promise<GetFilteredThingResponse> {
    const { data, count } = await this.thingService.getAllFiltered(
      filter,
      page,
      loadCount
    );
    return { things: data, totalCount: count };
  }
  // @Mutation()
  // async deleteAttraction(
  //   @Args("attractionId")
  //   attractionId: string
  // ): Promise<void> {
  //   return this.attractionService.deleteAttraction(attractionId);
  // }
}
