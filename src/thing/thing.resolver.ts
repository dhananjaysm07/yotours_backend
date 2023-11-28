import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Thing } from "./entities/thing.entity";
import { ThingService } from "./thing.service";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";

@Resolver(() => Thing)
export class ThingResolver {
  constructor(private readonly thingService: ThingService) {}

  @Mutation(() => Thing)
  createThing(
    @Args("createThingInput") createThingInput: CreateThingInput
  ) {
    return this.thingService.createThing(createThingInput);
  }

  @Query(() => [Thing])
  async getThings(): Promise<Thing[]> {
    return this.thingService.findAll();
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

  // @Mutation()
  // async deleteAttraction(
  //   @Args("attractionId")
  //   attractionId: string
  // ): Promise<void> {
  //   return this.attractionService.deleteAttraction(attractionId);
  // }
}
