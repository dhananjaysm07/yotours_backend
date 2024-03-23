import { InjectRepository } from "@nestjs/typeorm";
import {
  DataSource,
  In,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { Destination } from "./entities/destination.entity";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
import { ImageEntity } from "src/image/entities/image.entity";
import { Tag } from "src/tag/entities/tag.entity";
// import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { GenericService } from "src/global/filterQueryClass";
import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import {
  ContinentDto,
  CountryAndContinent,
  CountryDto,
} from "./dto/country-continent.dto";
export class DestinationService extends GenericService<Destination> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>
  ) {
    super(destinationRepository);
  }

  async createDestination(
    createDestinationInput: CreateDestinationInput
  ): Promise<Destination> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const newDestination = queryRunner.manager.create(
        Destination,
        createDestinationInput
      );

      if (createDestinationInput.tagId) {
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: createDestinationInput.tagId,
            active: true,
          },
        });

        newDestination.tag = tag;
      }

      if (
        createDestinationInput.imageUrls &&
        createDestinationInput.imageUrls.length > 0
      ) {
        const imageEntities = createDestinationInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
          });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          imageEntities
        );

        newDestination.images = savedImageEntities;
      }

      const savedDestination = await queryRunner.manager.save(
        Destination,
        newDestination
      );

      console.log("Destination created");

      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedDestination;
    } catch (error) {
      console.error("Transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      console.log("Query runner released");
    }
  }

  // updateDestination(
  //   id: string,
  //   updateDestinationInput: UpdateDestinationInput
  // ): Promise<Destination> {
  //   return this.destinationRepository.save({
  //     id,
  //     ...updateDestinationInput,
  //   });
  // }

  async updateDestination(
    updateDestinationInput: UpdateDestinationInput
  ): Promise<Destination> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const destinationToUpdate = await queryRunner.manager.findOneOrFail(
        Destination,
        {
          where: { id: updateDestinationInput.destinationId },
        }
      );
      queryRunner.manager.merge(
        Destination,
        destinationToUpdate,
        updateDestinationInput
      );

      if (updateDestinationInput.tagId) {
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: updateDestinationInput.tagId,
            active: true,
          },
        });

        destinationToUpdate.tag = tag;
      }

      if (
        updateDestinationInput.imageUrls &&
        updateDestinationInput.imageUrls.length > 0
      ) {
        const newImageEntities = updateDestinationInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
          });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          newImageEntities
        );

        destinationToUpdate.images = savedImageEntities;
      }

      const updatedDestination = await queryRunner.manager.save(
        Destination,
        destinationToUpdate
      );

      console.log("Destination updated");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return updatedDestination;
    } catch (error) {
      console.error("Transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      console.log("Query runner released");
    }
  }
  protected applyFilters(
    queryBuilder: SelectQueryBuilder<Destination>,
    filter: TourFilterInput
  ): void {
    queryBuilder
      .leftJoinAndSelect("entity.tag", "tag")
      // .leftJoinAndSelect("entity.destination", "destination")
      .leftJoinAndSelect("entity.images", "ImageEntity")
      .leftJoinAndSelect("entity.attractions", "attraction")
      .leftJoinAndSelect("entity.tours", "tour")
      .leftJoinAndSelect("entity.things", "thing");

    if (!filter.activeValues?.includes(false)) {
      queryBuilder.andWhere("tour.active IN (:...activeValues)", {
        activeValues: [true],
      });
    }

    if (filter) {
      // Example: Applying location filter
      if (filter.ispopular) {
        queryBuilder.andWhere("entity.isPopular = :popular", {
          popular: filter.ispopular,
        });
      }

      if (filter.location) {
        queryBuilder.andWhere("entity.destinationName = :location", {
          location: filter.location,
        });
      }

      if (filter.country && filter.country.length > 0) {
        queryBuilder.andWhere("entity.country IN (:...country)", {
          country: filter.country,
        });
      }

      if (filter.excludeCountry && filter.excludeCountry.length > 0) {
        queryBuilder.andWhere("entity.country NOT IN (:...excludeCountry)", {
          excludeCountry: filter.excludeCountry,
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
        queryBuilder.andWhere("entity.continent IN (:...continent)", {
          continent: filter.continent,
        });
      }
      queryBuilder.orderBy("entity.priority", "DESC");

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
  // async findAllDestinations(): Promise<Destination[]> {
  //   const destination = await this.destinationRepository.find({
  //     relations: ["images", "tours", "attractions", "tag", "things", "cars"],
  //     order: {
  //       priority: "DESC",
  //       destinationName: "ASC",
  //       // or 'DESC' for descending order
  //     },
  //   });
  //   console.log("destination list", destination);
  //   return destination;
  // }
  async findAllDestinations(isTourActive?: boolean): Promise<Destination[]> {
    // console.log("is tour active", isTourActive);
    if (!isTourActive) isTourActive = false;
    let query = this.destinationRepository
      .createQueryBuilder("destination")
      .leftJoinAndSelect("destination.tours", "tour")
      .leftJoinAndSelect("destination.images", "image")
      .leftJoinAndSelect("destination.attractions", "attraction")
      .leftJoinAndSelect("destination.tag", "tag")
      .leftJoinAndSelect("destination.things", "thing")
      .leftJoinAndSelect("destination.cars", "car")
      .orderBy("destination.priority", "DESC")
      .addOrderBy("destination.destinationName", "ASC");

    if (isTourActive === false) {
      query = query.where("tour.active = :active", { active: true });
    }

    return await query.getMany();
    // console.log("list of destinations", distinations);
    // return distinations;
  }

  async findOneDestination(id: string): Promise<Destination | null> {
    return this.destinationRepository.findOne({
      where: { id },
      relations: ["images", "tours"],
    });
  }

  async deleteDestination(destinationId: string): Promise<boolean> {
    const destination = await this.destinationRepository.findOne({
      where: { id: destinationId },
    });

    if (!destination) {
      throw new Error("Destination not found.");
    }

    await this.destinationRepository.remove(destination);

    return true;
  }

  async findDestinationsByIds(
    queryRunner: QueryRunner,
    ids: string[]
  ): Promise<Destination[]> {
    console.log("find destinations");
    return await queryRunner.manager.getRepository(Destination).find({
      where: { id: In(ids) },
    });
  }

  async getCountries(): Promise<CountryDto[]> {
    const countries = await this.destinationRepository
      .createQueryBuilder("destination")
      .leftJoinAndSelect("destination.tours", "tour")
      .select("DISTINCT destination.country", "country")
      .where("tour.active = :active", { active: true })
      .getRawMany();

    return countries.map((c) => ({ country: c.country }));
  }

  async getContinents(): Promise<ContinentDto[]> {
    const continents = await this.destinationRepository
      .createQueryBuilder("destination")
      .select("DISTINCT destination.continent", "continent")
      .getRawMany();

    return continents.map((c) => ({ continent: c.continent }));
  }

  async getCountriesAndContinents(): Promise<CountryAndContinent[]> {
    try {
      const result = await this.destinationRepository
        .createQueryBuilder("destination")
        .select("destination.country", "country")
        .addSelect("destination.continent", "continent")
        .addSelect("COUNT(destination.id)", "destinationCount")
        .innerJoin("destination.tours", "tour")
        .where("tour.active = :active", { active: true })
        .groupBy("destination.country")
        .addGroupBy("destination.continent")
        .getRawMany();

      return result.map((c) => ({
        country: c.country,
        continent: c.continent,
        destinationCount: parseInt(c.destinationCount),
      }));
    } catch (error) {
      // Handle errors (e.g., log them, throw custom GraphQL error, etc.)
      throw new Error("Failed to fetch countries and continents");
    }
  }

  async getCountriesAndContinentsForCMS(): Promise<CountryAndContinent[]> {
    try {
      const result = await this.destinationRepository
        .createQueryBuilder("destination")
        .select("destination.country", "country")
        .addSelect("destination.continent", "continent")
        .addSelect("COUNT(destination.id)", "destinationCount")
        .groupBy("destination.country, destination.continent")
        .getRawMany();

      return result.map((c) => ({
        country: c.country,
        continent: c.continent,
        destinationCount: parseInt(c.destinationCount),
      }));
    } catch (error) {
      // Handle errors (e.g., log them, throw custom GraphQL error, etc.)
      throw new Error("Failed to fetch countries and continents");
    }
  }

  async getAllDestinationLocations(): Promise<string[]> {
    const activeTours = await this.destinationRepository.find({
      select: ["destinationName"],
    });
    const uniqueLocations = [
      ...new Set(activeTours.map((destination) => destination.destinationName)),
    ];
    const sortedLocations = uniqueLocations
      .filter((location) => location !== null)
      .sort();
    return sortedLocations;
  }
}
