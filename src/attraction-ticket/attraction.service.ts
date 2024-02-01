import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Attraction } from "./entities/attraction.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";
import { GenericService } from "src/global/filterQueryClass";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";

export class AttractionService extends GenericService<Attraction> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>
  ) {
    super(attractionRepository);
  }

  async createAttraction(
    createAttractionInput: CreateAttractionInput
  ): Promise<Attraction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const newAttraction = queryRunner.manager.create(
        Attraction,
        createAttractionInput
      );

      // Handle tags if a tagId is provided
      if (createAttractionInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: createAttractionInput.tagId,
            active: true,
          },
        });

        newAttraction.tag = tag;
      }

      if (createAttractionInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: createAttractionInput.destinationId,
            },
          }
        );

        newAttraction.destination = destination;
      }

      if (
        createAttractionInput.imageUrls &&
        createAttractionInput.imageUrls.length > 0
      ) {
        const imageEntities = createAttractionInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
          });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          imageEntities
        );

        newAttraction.images = savedImageEntities;
      }

      const savedAttraction = await queryRunner.manager.save(
        Attraction,
        newAttraction
      );

      console.log("Attraction created");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedAttraction;
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
    queryBuilder: SelectQueryBuilder<Attraction>,
    filter: TourFilterInput
  ): void {
    queryBuilder
      .leftJoinAndSelect("entity.tag", "tag")
      .leftJoinAndSelect("entity.destination", "destination")
      .leftJoinAndSelect("entity.images", "ImageEntity");
    queryBuilder.andWhere("entity.active IN (:...activeValues)", {
      activeValues: filter.activeValues || [true],
    });
    if (filter) {
      // Example: Applying location filter
      if (filter.location) {
        queryBuilder.andWhere("entity.location = :location", {
          location: filter.location,
        });
      }

      // Example: Applying price range filter
      if (filter.priceMin && filter.priceMax) {
        queryBuilder.andWhere("entity.price BETWEEN :priceMin AND :priceMax", {
          priceMin: filter.priceMin,
          priceMax: filter.priceMax,
        });
      }

      if (filter.tagName && filter.tagName.length > 0) {
        queryBuilder.andWhere("tag.name IN (:...tagNames)", {
          tagNames: filter.tagName,
        });
      }

      if (filter.continent && filter.continent.length > 0) {
        queryBuilder.andWhere("destination.continent IN (:...continent)", {
          continent: filter.continent,
        });
      }

      if (filter.country && filter.country.length > 0) {
        queryBuilder.andWhere("destination.country IN (:...country)", {
          country: filter.country,
        });
      }

      // Add more conditions based on your filter parameters
    }

    // Example: Applying date range filter
    if (filter && filter.startDate && filter.endDate) {
      queryBuilder.andWhere("entity.fromDate BETWEEN :fromDate AND :toDate", {
        fromDate: filter.startDate,
        toDate: filter.endDate,
      });
    }
  }
  async updateAttraction(
    updateAttractionInput: UpdateAttractionInput
  ): Promise<Attraction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const attractionToUpdate = await queryRunner.manager.findOneOrFail(
        Attraction,
        { where: { id: updateAttractionInput.attractionId } }
      );
      // Update fields on the tour entity
      queryRunner.manager.merge(
        Attraction,
        attractionToUpdate,
        updateAttractionInput
      );

      // Handle tags if a tagId is provided
      if (updateAttractionInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: updateAttractionInput.tagId,
            active: true,
          },
        });

        attractionToUpdate.tag = tag;
      }

      if (updateAttractionInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: updateAttractionInput.destinationId,
            },
          }
        );

        attractionToUpdate.destination = destination;
      }

      if (
        updateAttractionInput.imageUrls &&
        updateAttractionInput.imageUrls.length > 0
      ) {
        const newImageEntities = updateAttractionInput.imageUrls.map((url) => {
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
        attractionToUpdate.images = savedImageEntities;
      }

      const savedAttraction = await queryRunner.manager.save(
        Attraction,
        attractionToUpdate
      );

      console.log("Attraction created");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedAttraction;
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

  async deleteAttraction(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tourToDelete = await queryRunner.manager.findOneOrFail(Attraction, {
        where: { id },
      });
      tourToDelete.active = false;
      await queryRunner.manager.save(Attraction, tourToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: tourToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async activateAttraction(id: string): Promise<{ id: string }> {
    // console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tourToDelete = await queryRunner.manager.findOneOrFail(Attraction, {
        where: { id },
      });
      tourToDelete.active = true;
      await queryRunner.manager.save(Attraction, tourToDelete);
      // await queryRunner.manager.remove(Tour, tourToDelete);

      await queryRunner.commitTransaction();
      return { id: tourToDelete.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Attraction[]> {
    return this.attractionRepository.find({
      where: { active: true },
      relations: ["images", "destination", "tag"],
    });
  }

  findOne(id: string): Promise<Attraction> {
    return this.attractionRepository.findOne({
      where: { id: id },
      relations: ["images", "destination", "tag"],
    });
  }

  async getUniqueCountriesAndContinents(): Promise<
    { country: string; continent: string; attractionCount: number }[]
  > {
    const attractions = await this.attractionRepository
      .createQueryBuilder("attraction")
      .leftJoinAndSelect("attraction.destination", "destination")
      .select("destination.country", "country")
      .addSelect("destination.continent", "continent")
      .addSelect("COUNT(DISTINCT attraction.id)", "attractionCount")
      .where("attraction.active = :isActive", { isActive: true })
      .groupBy("destination.country, destination.continent")
      .getRawMany();

    return attractions.map((item) => ({
      country: item.country,
      continent: item.continent,
      attractionCount: parseInt(item.attractionCount),
    }));
  }
}
