import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { CreateTourInput } from "./dto/create-tour.input";
import { Tour } from "./entities/tour.entity";
import { TourService } from "./tour.service";
import { UpdateTourInput } from "./dto/update-tour.input";
import {
  TourFilterInput,
  GetFilteredToursResponse,
} from "./dto/filter-tour-input";
import { CountryAndContinent } from "src/destination/dto/country-continent.dto";
type deleteReturnType = {
  id: string;
  message: string;
};
type filterType = {
  location: string;
  priceMin: number;
  priceMax: number;
  startDate: string;
  endDate: string;
};

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

  @Query(() => GetFilteredToursResponse)
  async getFilteredTours(
    @Args("page", { type: () => Int }) page: number,
    @Args("loadCount", { type: () => Int }) loadCount: number,
    @Args("filter") filter: TourFilterInput
  ): Promise<GetFilteredToursResponse> {
    const { data, count } = await this.tourService.getAllFiltered(
      filter,
      page,
      loadCount
    );
    return { tours: data, totalCount: count };
  }

  @Query(() => Tour)
  findOne(@Args("id") id: string) {
    return this.tourService.findOne(id);
  }

  @Mutation(() => Tour)
  deleteTour(@Args("id") id: string) {
    return this.tourService.deleteTour(id);
  }

  @Mutation(() => Tour)
  activateTour(@Args("id") id: string) {
    return this.tourService.activateTour(id);
  }

  @Query(() => [CountryAndContinent])
  async getCountriesAndContinentsForTours(): Promise<CountryAndContinent[]> {
    return this.tourService.getUniqueCountriesAndContinents();
  }
}
