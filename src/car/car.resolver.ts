import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { Car } from "./entities/car.entity";
import { CarService } from "./car.service";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GetFilteredCarResponse } from "./dto/filter-car-input";

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Mutation(() => Car)
  createCar(@Args("createCarInput") createCarInput: CreateCarInput) {
    return this.carService.createCar(createCarInput);
  }

  @Query(() => [Car])
  async getCars(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Query(() => [Car])
  async getCarsForCMS(): Promise<Car[]> {
    return this.carService.findAllForCMS();
  }

  @Query(() => Car)
  getCar(@Args("id") id: string) {
    return this.carService.findOne(id);
  }

  @Mutation(() => Car)
  async updateCar(
    @Args("updateCarInput")
    updateCarInput: UpdateCarInput
  ): Promise<Car> {
    return this.carService.updateCar(updateCarInput);
  }

  @Mutation(() => Car)
  deleteCar(@Args("id") id: string) {
    return this.carService.deleteCar(id);
  }

  @Mutation(() => Car)
  activateCar(@Args("id") id: string) {
    return this.carService.activateCar(id);
  }

  @Query(() => GetFilteredCarResponse)
  async getFilteredCars(
    @Args("page", { type: () => Int }) page: number,
    @Args("loadCount", { type: () => Int }) loadCount: number,
    @Args("filter") filter: TourFilterInput
  ): Promise<GetFilteredCarResponse> {
    const { data, count } = await this.carService.getAllFiltered(
      filter,
      page,
      loadCount
    );
    return { cars: data, totalCount: count };
  }
  // @Mutation()
  // async deleteAttraction(
  //   @Args("attractionId")
  //   attractionId: string
  // ): Promise<void> {
  //   return this.attractionService.deleteAttraction(attractionId);
  // }
}
