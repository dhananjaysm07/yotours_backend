import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { Attraction } from "./entities/attraction.entity";
import { AttractionService } from "./attraction.service";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionDestinationInput } from "./entities/update-att-destination.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
import { GetFilteredAttractionResponse } from "./entities/attraction-filter";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { CountryAndContinent } from "src/destination/dto/country-continent.dto";

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

  @Query(() => GetFilteredAttractionResponse)
  async getFilteredAttractions(
    @Args("page", { type: () => Int }) page: number,
    @Args("loadCount", { type: () => Int }) loadCount: number,
    @Args("filter") filter: TourFilterInput
  ): Promise<GetFilteredAttractionResponse> {
    const { data, count } = await this.attractionService.getAllFiltered(
      filter,
      page,
      loadCount
    );
    return { attractions: data, totalCount: count };
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

  @Query(() => [CountryAndContinent])
  async getCountriesAndContinentsForAttractions(): Promise<CountryAndContinent[]> {
    return this.attractionService.getUniqueCountriesAndContinents();
  }

  
}
