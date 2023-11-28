import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, In, QueryRunner, Repository } from "typeorm";
import { Destination } from "./entities/destination.entity";
import { CreateDestinationInput } from "./dto/createdestination.input";
import { UpdateDestinationInput } from "./dto/updatedestination.input";
import { ImageEntity } from "src/image/entities/image.entity";
import { Tag } from "src/tag/entities/tag.entity";
export class DestinationService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>
  ) {}

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
  async findAllDestinations(): Promise<Destination[]> {
    return this.destinationRepository.find({
      relations: ["images", "tours", "attractions", "tag"],
    });
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
    return queryRunner.manager.findBy(Destination, { id: In(ids) });
  }
}
