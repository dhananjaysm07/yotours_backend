import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Thing } from "./entities/thing.entity";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GenericService } from "src/global/filterQueryClass";

export class ThingService extends GenericService<Thing> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Thing)
    private thingRepository: Repository<Thing>
  ) {
    super(thingRepository);
  }

  async createThing(createThingInput: CreateThingInput): Promise<Thing> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const newThing = queryRunner.manager.create(Thing, createThingInput);

      // Handle tags if a tagId is provided
      if (createThingInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: createThingInput.tagId,
            active: true,
          },
        });

        newThing.tag = tag;
      }

      if (createThingInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: createThingInput.destinationId,
            },
          }
        );

        newThing.destination = destination;
      }

      if (createThingInput.imageUrls && createThingInput.imageUrls.length > 0) {
        const imageEntities = createThingInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
          });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          imageEntities
        );

        newThing.images = savedImageEntities;
      }

      const savedThing = await queryRunner.manager.save(Thing, newThing);

      console.log("Thing created");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedThing;
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

  async updateThing(updateThingInput: UpdateThingInput): Promise<Thing> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const thingToUpdate = await queryRunner.manager.findOneOrFail(Thing, {
        where: { id: updateThingInput.thingId },
      });
      // Update fields on the tour entity
      queryRunner.manager.merge(Thing, thingToUpdate, updateThingInput);

      // Handle tags if a tagId is provided
      if (updateThingInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: updateThingInput.tagId,
            active: true,
          },
        });

        thingToUpdate.tag = tag;
      }

      if (updateThingInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: updateThingInput.destinationId,
            },
          }
        );

        thingToUpdate.destination = destination;
      }

      if (updateThingInput.imageUrls && updateThingInput.imageUrls.length > 0) {
        const newImageEntities = updateThingInput.imageUrls.map((url) => {
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
        thingToUpdate.images = savedImageEntities;
      }

      const savedThing = await queryRunner.manager.save(Thing, thingToUpdate);

      console.log("Thing Updated");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedThing;
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
    queryBuilder: SelectQueryBuilder<Thing>,
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

  async deleteThing(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const thingToDelete = await queryRunner.manager.findOneOrFail(Thing, {
        where: { id },
      });
      thingToDelete.active = false;
      await queryRunner.manager.save(Thing, thingToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: thingToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async activateThing(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const thingToDelete = await queryRunner.manager.findOneOrFail(Thing, {
        where: { id },
      });
      thingToDelete.active = true;
      await queryRunner.manager.save(Thing, thingToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: thingToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAllForCMS(): Promise<Thing[]> {
    return this.thingRepository.find({
      relations: ["images", "destination", "tag"],
      order: {
        thingTitle: "ASC", // or 'DESC' for descending order
      },
    });
  }

  findAll(): Promise<Thing[]> {
    return this.thingRepository.find({
      where: { active: true },
      relations: ["images", "destination", "tag"],
      order: {
        thingTitle: "ASC", // or 'DESC' for descending order
      },
    });
  }

  findOne(id: string): Promise<Thing> {
    return this.thingRepository.findOne({
      where: { id: id },
      relations: ["images", "destination", "tag"],
    });
  }
}
