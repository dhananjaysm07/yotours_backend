import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Thing } from "./entities/thing.entity";
import { CreateThingInput } from "./dto/create-thing.input";
import { UpdateThingInput } from "./dto/update-thing.input";

export class ThingService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Thing)
    private thingRepository: Repository<Thing>
  ) {}

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
      where: { id: id, active: true },

      relations: ["images", "destination", "tag"],
    });
  }
}
