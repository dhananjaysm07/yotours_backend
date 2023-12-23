import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateTourInput } from "./dto/create-tour.input";
import { Tour } from "./entities/tour.entity";
import { TourService } from "./tour.service";
import { UpdateTourInput } from "./dto/update-tour.input";

@Resolver(() => Tour)
export class TourResolver {
  constructor(private readonly tourService: TourService) {}

  @Mutation(() => Tour)
  createTour(@Args("createTourInput") createTourInput: CreateTourInput) {
    return this.tourService.createTour(createTourInput);
  }
  @Mutation(() => Tour)
  updateTour(@Args("updateTourInput") updateTourInput: UpdateTourInput) {
    return this.tourService.updateTour(updateTourInput);
  }

  @Query(() => [Tour])
  async getTours(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Query(() => Tour)
  findOne(@Args("id") id: string) {
    return this.tourService.findOne(id);
  }

  @Mutation(() => Tour)
  async deleteTour(
    @Args("tourId")
    tourId: string
  ): Promise<void> {
    return this.tourService.deleteTour(tourId);
  }
}
