// package.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { LocationData, Package } from "./entities/holiday.entity";
import {
  UpdateCancellationPolicyInput,
  UpdateGeneralDetailInput,
  UpdateItineraryInput,
  UpdateLanguagesInput,
  UpdateLocationInput,
  UpdatePricingInput,
} from "./dto/holiday.dto";
import { DestinationService } from "src/destination/destination.service";
import { Destination } from "src/destination/entities/destination.entity";
// import { DayWiseItinerary } from "./entities/itinerary.entity";
// import { LocationData } from "./entities/location.entity";
// import { IntercityData } from "./entities/intercity.entity";
// import { SightSeeingData } from "./entities/sight.entity";
// import { HotelData } from "./entities/hotel.entity";
// import { title } from "process";

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    private dataSource: DataSource,
    private destinationService: DestinationService
  ) {}

  async findAll(): Promise<Package[]> {
    return this.packageRepository.find({
      relations: {
        destinations: true,
      },
    });
  }

  async findOneHoliday(id: string): Promise<Package | null> {
    return this.packageRepository.findOne({
      relations: {
        destinations: true,
      },
      where: { id },
    });
  }

  async createPackage(input: UpdateGeneralDetailInput): Promise<Package> {
    // const holiday = this.packageRepository.create(input);
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let holiday = new Package();
      holiday.type = input.type;
      holiday.title = input.title;
      holiday.durationData = input.durationData;
      holiday.datesData = input.datesData;
      holiday.summaryData = input.summaryData;
      holiday.themes = input.themes;
      holiday.preference = input.preference;

      let destinations = await this.destinationService.findDestinationsByIds(
        queryRunner,
        input.destinationIds
      );
      if (
        !destinations ||
        destinations.length !== input.destinationIds.length
      ) {
        throw new Error("Some destinations could not be found.");
      }
      holiday.destinations = destinations;
      return this.dataSource.manager.save(holiday);
    } catch (err) {
      throw err;
    }
  }

  async updateGeneralDetail(
    id: string,
    input: UpdateGeneralDetailInput
  ): Promise<Package> {
    try {
      const holiday = await this.findOneHoliday(id);
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const destinations = await this.destinationService.findDestinationsByIds(
        queryRunner,
        input.destinationIds
      );
      // console.log("is destination", destinations);
      if (
        !destinations ||
        destinations.length !== input.destinationIds.length
      ) {
        throw new Error("Some destinations could not be found.");
      }
      let inputObj = {
        type: input.type,
        title: input.title,
        durationData: input.durationData,
        datesData: input.datesData,
        summaryData: input.summaryData,
        destinations: destinations,
        themes: input.themes,
        preference: input.preference,
      };
      Object.assign(holiday, inputObj);
      return this.packageRepository.save(holiday);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async updateItinerary(
    id: string,
    input: UpdateItineraryInput
  ): Promise<Package> {
    const holiday = await this.findOneHoliday(id);
    holiday.daywiseItinerary = input.daywiseItinerary;
    await this.packageRepository.save(holiday);
    // console.log("day wise itinerary", holiday);
    return this.packageRepository.save(holiday);
  }

  async updateLocation(
    id: string,
    input: UpdateLocationInput
  ): Promise<Package> {
    const holiday = await this.findOneHoliday(id);
    console.log("holiday data", holiday);
    let locationData: LocationData;
    // const hotelsDataPromises = input.locationData.hotelsData.map(
    //   async (hotel) => {
    //     const destinations =
    //       await this.destinationService.findDestinationsByIds(
    //         queryRunner,
    //         hotel.destinationIds
    //       );
    //     console.log("is destination", destinations);
    //     if (
    //       !destinations ||
    //       destinations.length !== hotel.destinationIds.length
    //     ) {
    //       throw new Error("Some destinations could not be found.");
    //     }
    //     delete hotel.destinationIds;
    //     return this.hotelRepository.create({
    //       ...hotel,
    //       destinations: destinations,
    //     });
    //   }
    // );

    locationData = {
      hotels: input.locationData.hotelsData || null,
      intercityData: input.locationData.intercityData || null,
      sightData: input.locationData.sightseeingData || null,
      transfers: input.locationData.transfers || null,
    };
    holiday.locationData = locationData;
    return this.packageRepository.save(holiday);
  }

  async updateLanguages(
    id: string,
    input: UpdateLanguagesInput
  ): Promise<Package> {
    const holiday = await this.findOneHoliday(id);
    holiday.languages = input.languages;
    return this.packageRepository.save(holiday);
  }

  async updatePricing(id: string, input: UpdatePricingInput): Promise<Package> {
    const holiday = await this.findOneHoliday(id);
    holiday.pricingData = input.pricingData;
    return this.packageRepository.save(holiday);
  }

  async updateCancellationPolicy(
    id: string,
    input: UpdateCancellationPolicyInput
  ): Promise<Package> {
    const holiday = await this.findOneHoliday(id);
    holiday.cancellationPolicy = input.cancellationPolicy;
    return this.packageRepository.save(holiday);
  }

  // Add more methods as needed
}
