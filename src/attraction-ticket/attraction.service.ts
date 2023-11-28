import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Attraction } from "./entities/attraction.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { CreateAttractionInput } from "./dto/create-attraction.input";
import { UpdateAttractionInput } from "./dto/update-attraction.input";

export class AttractionService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>
  ) {}

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
  async updateAttraction(
    updateAttractionInput: UpdateAttractionInput
  ): Promise<Attraction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log("Transaction started");

      const attractionToUpdate =await queryRunner.manager.findOneOrFail(
        Attraction,
        {where:{id:updateAttractionInput.attractionId}}
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

  async deleteAttraction(attractionId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const attractionToDelete = await queryRunner.manager.findOneOrFail(Attraction, {
        where: { id: attractionId },
      });

      await queryRunner.manager.remove(Attraction, attractionToDelete);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Attraction[]> {
    return this.attractionRepository.find({
      relations: ["images", "destination", "tag"],
    });
  }

  findOne(id: string): Promise<Attraction> {
    return this.attractionRepository.findOne({
      where: { id: id },

      relations: ["images", "destination", "tag"],
    });
  }

}
