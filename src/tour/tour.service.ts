import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Tour } from "./entities/tour.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { CreateTourInput } from "./dto/create-tour.input";
import { Tag } from "src/tag/entities/tag.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { UpdateTourInput } from "./dto/update-tour.input";

export class TourService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>
  ) {}

  async createTour(createTourInput: CreateTourInput): Promise<Tour> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      // Create a new destination from the input data
      const newTour = queryRunner.manager.create(Tour, createTourInput);

      // Handle tags if a tagId is provided
      if (createTourInput.tagId) {
        // Assuming TagEntity is your tag entity name
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: createTourInput.tagId,
            // Optionally check if the tag is active or meets other criteria
            active: true,
          },
        });

        // Attach the tag to the new destination
        newTour.tag = tag; // This line assumes your Destination entity has a 'tag' property
      }

      if (createTourInput.destinationId) {
        // Assuming TagEntity is your tag entity name
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: createTourInput.destinationId,
              // Optionally check if the tag is active or meets other criteria
            },
          }
        );

        // Attach the tag to the new destination
        newTour.destination = destination; // This line assumes your Destination entity has a 'tag' property
      }

      // Check if imageUrls are provided
      if (createTourInput.imageUrls && createTourInput.imageUrls.length > 0) {
        // Handle the creation of image entities
        const imageEntities = createTourInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, {
            imageUrl: url,
            // The destination relation can be assigned later after saving the destination
          });
        });

        // Save image entities
        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          imageEntities
        );

        // Set the images on the new destination
        newTour.images = savedImageEntities;
      }

      // Save the destination with associated images (if any)
      const savedTour = await queryRunner.manager.save(Tour, newTour);

      console.log("Tour created");

      // Commit the transaction
      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return savedTour;
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

  async updateTour(updateTourInput: UpdateTourInput): Promise<Tour> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const tourToUpdate = await queryRunner.manager.findOneOrFail(Tour, {
        where: { id: updateTourInput.tourId },
      });

      queryRunner.manager.merge(Tour, tourToUpdate, updateTourInput);

      if (updateTourInput.tagId) {
        const tag = await queryRunner.manager.findOneOrFail(Tag, {
          where: {
            id: updateTourInput.tagId,
            active: true,
          },
        });
        tourToUpdate.tag = tag;
      }

      if (updateTourInput.destinationId) {
        const destination = await queryRunner.manager.findOneOrFail(
          Destination,
          {
            where: {
              id: updateTourInput.destinationId,
            },
          }
        );
        tourToUpdate.destination = destination;
      }

      if (updateTourInput.imageUrls && updateTourInput.imageUrls.length > 0) {
        const newImageEntities = updateTourInput.imageUrls.map((url) => {
          return queryRunner.manager.create(ImageEntity, { imageUrl: url });
        });

        const savedImageEntities = await queryRunner.manager.save(
          ImageEntity,
          newImageEntities
        );
        tourToUpdate.images = savedImageEntities;
      }

      const updatedTour = await queryRunner.manager.save(Tour, tourToUpdate);

      console.log("Tour updated");

      await queryRunner.commitTransaction();
      console.log("Transaction committed");

      return updatedTour;
    } catch (error) {
      console.error("Transaction failed", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      console.log("Query runner released");
    }
  }
  async deleteTour(id: string): Promise<{ id: string }> {
    console.log("function called", id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tourToDelete = await queryRunner.manager.findOneOrFail(Tour, {
        where: { id },
      });
      tourToDelete.active = false;
      await queryRunner.manager.save(Tour, tourToDelete);
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

  findAll(): Promise<Tour[]> {
    return this.tourRepository.find({
      where: { active: true },
      relations: ["images", "destination", "tag"],
    });
  }

  findOne(id: string): Promise<Tour> {
    return this.tourRepository.findOne({
      where: { id: id, active: true },

      relations: ["images", "destination", "tag"],
    });
  }
}
