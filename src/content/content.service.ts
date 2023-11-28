import { Injectable, NotFoundException } from "@nestjs/common";
import { Content } from "./entities/content.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { CreateContentInput } from "./dto/create-content.input";
import { UpdateContentInput } from "./dto/update-content.input";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private dataSource: DataSource
  ) {}

  async create(createContentInput: CreateContentInput): Promise<Content> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the existing content
      const existingContent = await this.contentRepository
      .createQueryBuilder("content")
      .orderBy("content.id", "ASC") // assuming 'id' is your primary key
      .getOne();

      // If it exists, throw an error
      if (existingContent) {
        throw new Error("Content already exists");
      }

      const newContent = this.contentRepository.create(createContentInput);
      const savedContent = await queryRunner.manager.save(Content, newContent);

      await queryRunner.commitTransaction();
      return savedContent;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(): Promise<Content> {
    const content = await this.contentRepository
      .createQueryBuilder("content")
      .orderBy("content.id", "ASC") // assuming 'id' is your primary key
      .getOne();

    if (!content) {
      throw new NotFoundException(`Content not found`);
    }

    return content;
  }

  async updateContent(
    updateContentInput: UpdateContentInput
  ): Promise<Content> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try { 
      // Find the existing content
      const existingContent = await this.contentRepository.findOne({where:{id: updateContentInput.id}});

      // If it doesn't exist, throw an error
      if (!existingContent) {
        throw new NotFoundException("Content not found");
      }

      // Update the existing content with the input data
      const updatedContent = this.contentRepository.merge(
        existingContent,
        updateContentInput
      );

      const savedContent = await queryRunner.manager.save(
        Content,
        updatedContent
      );

      await queryRunner.commitTransaction();
      return savedContent;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
