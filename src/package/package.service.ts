import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, In, Repository } from "typeorm";
import { PackageGeneral } from "./entities/general.entity";
import { Highlight } from "./entities/highlight.entity";
import { Photo } from "./entities/photo.entity";
import { CreatePackageGeneralInput } from "./dto/create-package.input";
import { Itinerary } from "./entities/itinerary.entity";
import { ItineraryInput } from "./dto/itinerary.input";
import { LocationDetails } from "./entities/location.entity";
import { LocationDetailsInput } from "./dto/location.input";
import { DestinationService } from "src/destination/destination.service";
import { TextArray } from "./entities/textarray.entity";
import { HotelDetails } from "./entities/hotel.entity";
import { Sight } from "./entities/sight.entity";
import { InterCity } from "./entities/intercity.entity";
import { HotelArray } from "./entities/hotelarray.entity";
import { DateDetails } from "./entities/datedetails.entity";
import { TravelDate } from "./entities/travel-date.entity";
@Injectable()
export class PackageGeneralService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PackageGeneral)
    private packageGeneralRepository: Repository<PackageGeneral>,
    @InjectRepository(LocationDetails)
    private locationDetailsRepository: Repository<LocationDetails>,
    @InjectRepository(Highlight)
    private highlightRepository: Repository<Highlight>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(Itinerary)
    private itineraryRepository: Repository<Itinerary>,
    @InjectRepository(DateDetails)
    private dateRepository: Repository<DateDetails>,
    @InjectRepository(TravelDate)
    private travelRepository: Repository<TravelDate>,
    private destinationService: DestinationService
  ) {}

  async create(
    createPackageGeneralInput: CreatePackageGeneralInput
  ): Promise<PackageGeneral> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log("create package function called");
    try {
      let newPackageGeneral: PackageGeneral;
      // console.log("id----", createPackageGeneralInput.id);
      if (createPackageGeneralInput.id) {
        newPackageGeneral = await queryRunner.manager.findOneOrFail(
          PackageGeneral,
          { where: { id: createPackageGeneralInput.id } }
        );
      }
      if (!createPackageGeneralInput.id || newPackageGeneral)
        newPackageGeneral = this.packageGeneralRepository.create(
          createPackageGeneralInput
        );

      console.log("step-1");
      // Handle destinations
      // if (createPackageGeneralInput.destinationIds.length > 0) {
      //   const destinations =
      //     await this.destinationService.findDestinationsByIds(
      //       queryRunner,
      //       createPackageGeneralInput.destinationIds
      //     );
      //   console.log("is destination", destinations);
      //   if (
      //     !destinations ||
      //     destinations.length !==
      //       createPackageGeneralInput.destinationIds.length
      //   ) {
      //     throw new Error("Some destinations could not be found.");
      //   }
      //   newPackageGeneral.destinations = destinations;
      // }

      console.log("step-2");

      // Handle highlights
      if (
        createPackageGeneralInput.highlights &&
        createPackageGeneralInput.highlights.length > 0
      ) {
        const highlights = createPackageGeneralInput.highlights.map(
          (highlightInput) => this.highlightRepository.create(highlightInput)
        );
        newPackageGeneral.highlights = await queryRunner.manager.save(
          Highlight,
          highlights
        );
      }
      console.log("step-3");

      if (
        createPackageGeneralInput.dates &&
        createPackageGeneralInput.dates.length > 0
      ) {
        const dates = await Promise.all(
          createPackageGeneralInput.dates.map(async (date) => {
            const travelDates = date.travelDates.map((travelDate) => {
              return this.travelRepository.create(travelDate);
            });
            const dateNew = this.dateRepository.create(date);
            dateNew.travelDates = await queryRunner.manager.save(
              TravelDate,
              travelDates
            );
            return dateNew;
          })
        );
        newPackageGeneral.dates = await queryRunner.manager.save(
          DateDetails,
          dates
        );
      }
      console.log("step-4");

      // Handle photos
      if (
        createPackageGeneralInput.photos &&
        createPackageGeneralInput.photos.length > 0
      ) {
        const photos = createPackageGeneralInput.photos.map((photoInput) =>
          this.photoRepository.create(photoInput)
        );
        newPackageGeneral.photos = await queryRunner.manager.save(
          Photo,
          photos
        );
      }
      console.log("step-5");

      // Save package general entity
      const savedPackageGeneral = await queryRunner.manager.save(
        PackageGeneral,
        newPackageGeneral
      );

      console.log("saved package general", savedPackageGeneral);
      await queryRunner.commitTransaction();
      return savedPackageGeneral;
    } catch (error) {
      console.log("error", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // DELETE
  async delete(id: string): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Deletion transaction started");

      const packageGeneral = await queryRunner.manager.findOne(PackageGeneral, {
        where: { id: id },
        relations: ["highlights", "photos", "itineraries"],
      });

      if (!packageGeneral) {
        throw new NotFoundException(`Package with ID ${id} not found`);
      }

      if (packageGeneral.highlights && packageGeneral.highlights.length > 0) {
        await queryRunner.manager.remove(Highlight, packageGeneral.highlights);
      }

      if (packageGeneral.photos && packageGeneral.photos.length > 0) {
        await queryRunner.manager.remove(Photo, packageGeneral.photos);
      }

      if (packageGeneral.itineraries && packageGeneral.itineraries.length > 0) {
        await queryRunner.manager.remove(Itinerary, packageGeneral.itineraries);
      }

      await queryRunner.manager.remove(PackageGeneral, packageGeneral);

      console.log("PackageGeneral and related entities deleted");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Deletion transaction committed");
      return "Deleted Successfully";
    } catch (error) {
      // Rollback in case of an error
      console.error("Deletion transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
      console.log("Query runner released for deletion");
    }
  }

  async findOne(id: string): Promise<PackageGeneral> {
    const packageGeneral = await this.packageGeneralRepository.findOne({
      where: { id },
      relations: ["destinations", "highlights", "photos"], // Include itineraries in the relations
    });
    if (!packageGeneral) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return packageGeneral;
  }

  //method to add itineraries
  // async addItineraries(
  //   id: string,
  //   itineraryInputs: ItineraryInput[]
  // ): Promise<string[]> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   const newItineraryIds: string[] = [];

  //   try {
  //     const packageGeneral = await queryRunner.manager.findOne(PackageGeneral, {
  //       where: { id },
  //     });
  //     if (!packageGeneral) {
  //       throw new Error("Package not found");
  //     }

  //     for (const itineraryInput of itineraryInputs) {
  //       let itinerary = await queryRunner.manager.findOne(Itinerary, {
  //         where: { id: itineraryInput.id },
  //       });
  //       if (!itinerary) {
  //         itinerary = queryRunner.manager.create(Itinerary, {
  //           ...itineraryInput,
  //           packageGeneral: { id: packageGeneral.id },
  //         });
  //       } else {
  //         Object.assign(itinerary, itineraryInput);
  //       }

  //       itinerary = await queryRunner.manager.save(Itinerary, itinerary);

  //       newItineraryIds.push(itinerary.id);

  //       if (itineraryInput.textArrays) {
  //         for (const textArrayInput of itineraryInput.textArrays) {
  //           let textArray = itinerary.textArrays.find(
  //             (t) => t.section === textArrayInput.section
  //           );
  //           if (!textArray) {
  //             textArray = queryRunner.manager.create(TextArray, {
  //               ...textArrayInput,
  //               itinerary: { id: itinerary.id },
  //             });
  //           } else {
  //             Object.assign(textArray, textArrayInput);
  //           }

  //           textArray = await queryRunner.manager.save(TextArray, textArray);
  //         }
  //       }
  //     }

  //     await queryRunner.commitTransaction();
  //     return newItineraryIds;
  //   } catch (error) {
  //     console.error("Error in addItineraries: ", error);
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async addItineraries(
    id: string,
    itineraryInputs: ItineraryInput[]
  ): Promise<string[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const newItineraryIds: string[] = [];

    try {
      // Find the PackageGeneral entity
      const packageGeneral = await queryRunner.manager.findOneOrFail(
        PackageGeneral,
        { where: { id }, relations: ["itineraries"] }
      );

      // Delete old itineraries
      await queryRunner.manager.remove(packageGeneral.itineraries);

      for (const itineraryInput of itineraryInputs) {
        // Create new itinerary
        const itinerary = queryRunner.manager.create(Itinerary, {
          ...itineraryInput,
          packageGeneral,
        });
        const savedItinerary = await queryRunner.manager.save(
          Itinerary,
          itinerary
        );
        newItineraryIds.push(savedItinerary.id);

        if (itineraryInput.textArrays) {
          for (const textArrayInput of itineraryInput.textArrays) {
            let textArray = queryRunner.manager.create(TextArray, {
              ...textArrayInput,
              itinerary: savedItinerary,
            });
            textArray = await queryRunner.manager.save(TextArray, textArray);
          }
        }
      }

      // Update PackageGeneral entity with the new itineraries
      const newItineraries = await Promise.all(
        newItineraryIds.map(async (id) => {
          const itinerary = await queryRunner.manager.findOneOrFail(Itinerary, {
            where: { id },
          });
          return itinerary;
        })
      );

      packageGeneral.itineraries = newItineraries;
      await queryRunner.manager.save(PackageGeneral, packageGeneral);

      await queryRunner.commitTransaction();
      return newItineraryIds;
    } catch (error) {
      console.error("Error in addItineraries: ", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  //method to add location details
  async addLocationDetails(
    id: string,
    locationDetailsInput: LocationDetailsInput
  ): Promise<LocationDetails> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const newLocationDetailsId: string = "";
    try {
      const packageGeneral = await queryRunner.manager.findOne(PackageGeneral, {
        where: { id },
        relations: ["locationDetails"],
      });

      console.log(packageGeneral);
      if (!packageGeneral) {
        throw new Error("Package not found");
      }

      let locationDetails = packageGeneral.locationDetails;

      console.log("Location details found", locationDetails);

      // If LocationDetails doesn't exist, create a new one
      if (!locationDetails) {
        locationDetails = queryRunner.manager.create(LocationDetails, {
          packageGeneral: packageGeneral,
        });
      }

      // Update the fields of LocationDetails
      Object.assign(locationDetails, locationDetailsInput);

      console.log("Created location details", locationDetails.id);

      if (locationDetailsInput.hotelDetails) {
        for (const hotelDetail of locationDetailsInput.hotelDetails) {
          console.log("Creating hotel", hotelDetail);
          let hotel = locationDetails.hotelDetails.find(
            (h) => h.id === hotelDetail.id
          );
          if (!hotel) {
            hotel = queryRunner.manager.create(HotelDetails, {
              ...hotelDetail,
              locationDetails: { id: locationDetails.id },
            });
          } else {
            Object.assign(hotel, hotelDetail);
          }
          hotel = await queryRunner.manager.save(HotelDetails, hotel);
          if (hotelDetail.hotelArrays) {
            for (const hotelArrayInput of hotelDetail.hotelArrays) {
              const hotelArray = queryRunner.manager.create(HotelArray, {
                ...hotelArrayInput,
                hotelDetails: hotel,
              });
              await queryRunner.manager.save(HotelArray, hotelArray);
            }
          }
        }
      }
      if (locationDetails.sights) {
        for (const sight of locationDetails.sights) {
          console.log("Creating sight", sight);
          const sightseeing = queryRunner.manager.create(Sight, {
            ...sight,
            locationDetails: locationDetails,
          });
          await queryRunner.manager.save(Sight, sightseeing);
        }
      }
      if (locationDetails.intercityTransfers) {
        for (const intercityTransfer of locationDetails.intercityTransfers) {
          console.log("Creating intercity transfers", intercityTransfer);
          const newIntercityTransfer = queryRunner.manager.create(InterCity, {
            ...intercityTransfer,
            locationDetails: locationDetails,
          });
          await queryRunner.manager.save(InterCity, newIntercityTransfer);
        }
      }

      const savedLocationDetails = await queryRunner.manager.save(
        LocationDetails,
        locationDetails
      );

      // packageGeneral.locationDetails = savedLocationDetails;
      // await queryRunner.manager.save(PackageGeneral, packageGeneral);

      await queryRunner.commitTransaction();
      console.log("Location details created");
      return savedLocationDetails;
    } catch (error) {
      console.error("Error in addLocationDetails: ", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ items: PackageGeneral[]; totalCount: number }> {
    const [results, total] = await this.packageGeneralRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["destinations", "cities", "highlights", "photos"], // Include relations as required
    });

    if (results.length === 0 && page > 1) {
      throw new NotFoundException(`No results found for page ${page}`);
    }

    return {
      items: results,
      totalCount: total,
    };
  }

  // Additional method to fetch package with itineraries
  async findOneWithItineraries(id: string): Promise<PackageGeneral> {
    const packageGeneral = await this.packageGeneralRepository.findOne({
      where: { id },
      relations: ["destinations", "highlights", "photos", "itineraries"], // Include itineraries in the relations
    });
    if (!packageGeneral) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return packageGeneral;
  }

  async findOneWithLocation(id: string): Promise<PackageGeneral> {
    const packageGeneral = await this.packageGeneralRepository.findOne({
      where: { id },
      relations: [
        "destinations",
        "highlights",
        "photos",
        "itineraries",
        "locationDetails",
        "locationDetails.hotelDetails",
        "locationDetails.hotelDetails.hotelArrays",
      ], // Include itineraries in the relations
    });
    if (!packageGeneral) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return packageGeneral;
  }
}
