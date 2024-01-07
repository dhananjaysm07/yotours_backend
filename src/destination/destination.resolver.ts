import { Resolver, Mutation, Args, Query, ID, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Destination } from "../destination/entities/destination.entity";
import { DestinationService } from "./destination.service";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
import { GetFilteredDestinationResponse } from "./dto/filter-destination-input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";

@Resolver(() => Destination)
export class DestinationResolver {
  constructor(private readonly destinationService: DestinationService) {}

  @Mutation(() => Destination)
  createDestination(
    @Args("createDestinationInput")
    createDestinationInput: CreateDestinationInput
  ) {
    return this.destinationService.createDestination(createDestinationInput);
  }
  @Mutation(() => Destination)
  updateDestination(
    @Args("updateDestinationInput")
    updateDestinationInput: UpdateDestinationInput
  ) {
    return this.destinationService.updateDestination(updateDestinationInput);
  }
  @Query(() => [Destination])
  async getDestinations(): Promise<Destination[]> {
    return this.destinationService.findAllDestinations();
  }

  @Query(() => Destination, { nullable: true })
  async getDestination(
    @Args("id", { type: () => String }) id: string
  ): Promise<Destination | null> {
    // Assuming you have a method findOne in your service
    return this.destinationService.findOneDestination(id);
  }

  @Query(() => GetFilteredDestinationResponse)
  async getFilteredDestination(
    @Args("page", { type: () => Int }) page: number,
    @Args("loadCount", { type: () => Int }) loadCount: number,
    @Args("filter") filter: TourFilterInput
  ): Promise<GetFilteredDestinationResponse> {
    const { data, count } = await this.destinationService.getAllFiltered(
      filter,
      page,
      loadCount
    );
    return { destinations: data, totalCount: count };
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteDestination(
    @Args("destinationId", { type: () => String }) destinationId: string
  ): Promise<boolean> {
    return await this.destinationService.deleteDestination(destinationId);
  }
  // Other resolver methods...
}
