import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Tag } from "src/tag/entities/tag.entity";
// import { car } from "./entities/car.entity";
// import { CreatecarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GenericService } from "src/global/filterQueryClass";
import { CreateCarInput } from "./dto/create-car.input";
import { Car } from "./entities/car.entity";

export class CarService extends GenericService<Car> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ) {
    super(carRepository);
  }

  async createCar(CreateCarInput: CreateCarInput): Promise<Car> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const newCar = queryRunner.manager.create(Car, CreateCarInput);

      // Handle tags if a tagId is provided
      if (CreateCarInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: CreateCarInput.tagId,
            active: true,
          },
        });

        newCar.tag = tag;
      }

      if (CreateCarInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: CreateCarInput.destinationId,
            },
          }
        );

        newCar.destination = destination;
      }

      if (CreateCarInput.imageUrls && CreateCarInput.imageUrls.length > 0) {
        const imageEntities = CreateCarInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
          });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          imageEntities
        );

        newCar.images = savedImageEntities;
      }

      const savedCar = await queryRunner.manager.save(Car, newCar);

      console.log("Car created");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedCar;
    } catch (error) {
      // Rollback in case of an error
      console.error("Transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner regardless of the transaction outcome
      await queryRunner.release();
      console.log("Query runner released");
    }
  }

  async updateCar(updateCarInput: UpdateCarInput): Promise<Car> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const carToUpdate = await queryRunner.manager.findOneOrFail(Car, {
        where: { id: updateCarInput.carId },
      });
      // Update fields on the tour entity
      queryRunner.manager.merge(Car, carToUpdate, updateCarInput);

      // Handle tags if a tagId is provided
      if (updateCarInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: updateCarInput.tagId,
            active: true,
          },
        });

        carToUpdate.tag = tag;
      }

      if (updateCarInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: updateCarInput.destinationId,
            },
          }
        );

        carToUpdate.destination = destination;
      }

      if (updateCarInput.imageUrls && updateCarInput.imageUrls.length > 0) {
        const newImageEntities = updateCarInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
            // The destination relation can be assigned later after saving the destination
          });
        });

        // Save image entities
        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          newImageEntities
        );

        // Set the images on the new destination
        carToUpdate.images = savedImageEntities;
      }

      const savedCar = await queryRunner.manager.save(Car, carToUpdate);

      console.log("Car Updated");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedCar;
    } catch (error) {
      // Rollback in case of an error
      console.error("Transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner regardless of the transaction outcome
      await queryRunner.release();
      console.log("Query runner released");
    }
  }

  protected applyFilters(
    queryBuilder: SelectQueryBuilder<Car>,
    filter: TourFilterInput
  ): void {
    queryBuilder
      .leftJoinAndSelect("entity.tag", "tag")
      // .leftJoinAndSelect("entity.destination", "destination")
      .leftJoinAndSelect("entity.images", "ImageEntity")
      .leftJoinAndSelect("entity.destination", "destination");

    if (filter) {
      // Example: Applying location filter
      // if (filter.location) {
      //   queryBuilder.andWhere("entity.country = :location", {
      //     location: filter.location,
      //   });
      // }

      // if (filter.country && filter.country.length > 0) {
      //   queryBuilder.andWhere("entity.country IN (:...country)", {
      //     country: filter.country,
      //   });
      // }

      // // Example: Applying price range filter
      // if (filter.priceMin && filter.priceMax) {
      //   queryBuilder.andWhere("entity.price BETWEEN :priceMin AND :priceMax", {
      //     priceMin: filter.priceMin,
      //     priceMax: filter.priceMax,
      //   });
      // }

      if (filter.tagName && filter.tagName.length > 0) {
        queryBuilder.andWhere("tag.name IN (:...tagNames)", {
          tagNames: filter.tagName,
        });
      }

      // if (filter.continent && filter.continent.length > 0) {
      //   queryBuilder.andWhere("entity.continent IN (:...continent)", {
      //     continent: filter.continent,
      //   });
      // }
      // queryBuilder.orderBy("entity.priority", "DESC");

      // Add more conditions based on your filter parameters
    }

    // Example: Applying date range filter
    // if (filter && filter.startDate && filter.endDate) {
    //   queryBuilder.andWhere("entity.fromDate BETWEEN :fromDate AND :toDate", {
    //     fromDate: filter.startDate,
    //     toDate: filter.endDate,
    //   });
    // }
  }

  async deleteCar(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const carToDelete = await queryRunner.manager.findOneOrFail(Car, {
        where: { id },
      });
      carToDelete.active = false;
      await queryRunner.manager.save(Car, carToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: carToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async activateCar(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const carToDelete = await queryRunner.manager.findOneOrFail(Car, {
        where: { id },
      });
      carToDelete.active = true;
      await queryRunner.manager.save(Car, carToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: carToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAllForCMS(): Promise<Car[]> {
    return this.carRepository.find({
      relations: ["images", "destination", "tag"],
      order: {
        carTitle: "ASC", // or 'DESC' for descending order
      },
    });
  }

  findAll(): Promise<Car[]> {
    return this.carRepository.find({
      where: { active: true },
      relations: ["images", "destination", "tag"],
      order: {
        carTitle: "ASC", // or 'DESC' for descending order
      },
    });
  }

  findOne(id: string): Promise<Car> {
    return this.carRepository.findOne({
      where: { id: id },
      relations: ["images", "destination", "tag"],
    });
  }
}
