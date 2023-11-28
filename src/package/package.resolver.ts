import { Resolver, Mutation, Args, Query, ID } from "@nestjs/graphql";
import { PackageGeneral } from "./entities/general.entity";
import { PackageGeneralService } from "./package.service";
import { CreatePackageGeneralInput } from "./dto/create-package.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ItineraryInput } from "./dto/itinerary.input";
import { LocationDetailsInput } from "./dto/location.input";
import { LocationDetails } from "./entities/location.entity";
import { Destination } from "../destination/entities/destination.entity";

@Resolver(() => PackageGeneral)
export class PackageGeneralResolver {
  constructor(private readonly packageGeneralService: PackageGeneralService) {}

  @Mutation(() => PackageGeneral)
  // @UseGuards(JwtAuthGuard)
  async createPackageGeneral(
    @Args("createPackageGeneralInput")
    createPackageGeneralInput: CreatePackageGeneralInput
  ): Promise<PackageGeneral> {
    return this.packageGeneralService.create(createPackageGeneralInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deletePackageGeneral(@Args("id") id: string): Promise<string> {
    return this.packageGeneralService.delete(id);
  }

  @Query(() => PackageGeneral)
  @UseGuards(JwtAuthGuard)
  async getPackageGeneral(@Args("id") id: string): Promise<PackageGeneral> {
    return await this.packageGeneralService.findOne(id);
  }

  @Query(() => PackageGeneral)
  @UseGuards(JwtAuthGuard)
  async getPackageGeneralWithItineraries(
    @Args("id") id: string
  ): Promise<PackageGeneral> {
    return await this.packageGeneralService.findOneWithItineraries(id);
  }

  // Mutation to add itinerary to an existing package
  @Mutation(() => [String])
  async addItineraryToPackage(
    @Args("packageId", { type: () => ID }) packageId: string,
    @Args("itineraryInput", { type: () => [ItineraryInput] })
    itineraryInput: ItineraryInput[]
  ): Promise<string[]> {
    return this.packageGeneralService.addItineraries(packageId, itineraryInput);
  }

  @Mutation(() => LocationDetails)
  async addLocationDetailsToPackage(
    @Args("packageId", { type: () => ID }) packageId: string,
    @Args("locationDetailsInput", { type: () => LocationDetailsInput })
    locationDetailsInput: LocationDetailsInput
  ): Promise<LocationDetails> {
    return this.packageGeneralService.addLocationDetails(
      packageId,
      locationDetailsInput
    );
  }

  @Query(() => PackageGeneral)
  async getPackageGeneralWithLocationDetails(
    @Args("id") id: string
  ): Promise<PackageGeneral> {
    return await this.packageGeneralService.findOneWithLocation(id);
  }

  @Query(() => PackageGeneral)
  // @UseGuards(JwtAuthGuard)
  async getPackageWithItinerary(
    @Args("packageId", { type: () => ID }) packageId: string
  ): Promise<PackageGeneral> {
    return await this.packageGeneralService.findOneWithItineraries(packageId);
  }


  // Other resolver methods...
}
