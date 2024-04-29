// package.resolver.ts

import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
// import { Package } from './package.entity';
import { PackageService } from "./holiday.service";
import { Package } from "./entities/holiday.entity";
import {
  UpdateCancellationPolicyInput,
  UpdateGeneralDetailInput,
  UpdateItineraryInput,
  UpdateLanguagesInput,
  UpdateLocationInput,
  UpdatePricingInput,
} from "./dto/holiday.dto";

@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Query(() => [Package])
  async getallpackages(): Promise<Package[]> {
    return this.packageService.findAll();
  }

  @Query(() => Package, { nullable: true })
  async getHoliday(
    @Args("id", { type: () => String }) id: string
  ): Promise<Package | null> {
    return this.packageService.findOneHoliday(id);
  }

  @Mutation(() => Package)
  async createPackage(
    @Args("input") input: UpdateGeneralDetailInput
  ): Promise<Package> {
    return this.packageService.createPackage(input);
  }

  @Mutation(() => Package)
  async updateGeneralDetail(
    @Args("id") id: string,
    @Args("input") input: UpdateGeneralDetailInput
  ): Promise<Package> {
    return this.packageService.updateGeneralDetail(id, input);
  }

  @Mutation(() => Package)
  async updateItinerary(
    @Args("id") id: string,
    @Args("input") input: UpdateItineraryInput
  ): Promise<Package> {
    return this.packageService.updateItinerary(id, input);
  }

  @Mutation(() => Package)
  async updateLocation(
    @Args("id") id: string,
    @Args("input") input: UpdateLocationInput
  ): Promise<Package> {
    return this.packageService.updateLocation(id, input);
  }

  @Mutation(() => Package)
  async updateLanguages(
    @Args("id") id: string,
    @Args("input") input: UpdateLanguagesInput
  ): Promise<Package> {
    return this.packageService.updateLanguages(id, input);
  }

  @Mutation(() => Package)
  async updatePricing(
    @Args("id") id: string,
    @Args("input") input: UpdatePricingInput
  ): Promise<Package> {
    return this.packageService.updatePricing(id, input);
  }

  @Mutation(() => Package)
  async updateCancellationPolicy(
    @Args("id") id: string,
    @Args("input") input: UpdateCancellationPolicyInput
  ): Promise<Package> {
    return this.packageService.updateCancellationPolicy(id, input);
  }
}
