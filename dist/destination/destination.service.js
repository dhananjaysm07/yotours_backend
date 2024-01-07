"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const destination_entity_1 = require("./entities/destination.entity");
const image_entity_1 = require("../image/entities/image.entity");
const tag_entity_1 = require("../tag/entities/tag.entity");
const filterQueryClass_1 = require("../global/filterQueryClass");
let DestinationService = class DestinationService extends filterQueryClass_1.GenericService {
    constructor(dataSource, destinationRepository) {
        super(destinationRepository);
        this.dataSource = dataSource;
        this.destinationRepository = destinationRepository;
    }
    async createDestination(createDestinationInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const newDestination = queryRunner.manager.create(destination_entity_1.Destination, createDestinationInput);
            if (createDestinationInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: createDestinationInput.tagId,
                        active: true,
                    },
                });
                newDestination.tag = tag;
            }
            if (createDestinationInput.imageUrls &&
                createDestinationInput.imageUrls.length > 0) {
                const imageEntities = createDestinationInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, imageEntities);
                newDestination.images = savedImageEntities;
            }
            const savedDestination = await queryRunner.manager.save(destination_entity_1.Destination, newDestination);
            console.log("Destination created");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedDestination;
        }
        catch (error) {
            console.error("Transaction failed", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
            console.log("Query runner released");
        }
    }
    async updateDestination(updateDestinationInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const destinationToUpdate = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                where: { id: updateDestinationInput.destinationId },
            });
            queryRunner.manager.merge(destination_entity_1.Destination, destinationToUpdate, updateDestinationInput);
            if (updateDestinationInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: updateDestinationInput.tagId,
                        active: true,
                    },
                });
                destinationToUpdate.tag = tag;
            }
            if (updateDestinationInput.imageUrls &&
                updateDestinationInput.imageUrls.length > 0) {
                const newImageEntities = updateDestinationInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, newImageEntities);
                destinationToUpdate.images = savedImageEntities;
            }
            const updatedDestination = await queryRunner.manager.save(destination_entity_1.Destination, destinationToUpdate);
            console.log("Destination updated");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return updatedDestination;
        }
        catch (error) {
            console.error("Transaction failed", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
            console.log("Query runner released");
        }
    }
    applyFilters(queryBuilder, filter) {
        queryBuilder
            .leftJoinAndSelect("entity.tag", "tag")
            .leftJoinAndSelect("entity.images", "ImageEntity")
            .leftJoinAndSelect("entity.attractions", "attraction")
            .leftJoinAndSelect("entity.tours", "tour")
            .leftJoinAndSelect("entity.things", "thing");
        if (filter) {
            if (filter.location) {
                queryBuilder.andWhere("entity.country = :location", {
                    location: filter.location,
                });
            }
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
        }
        if (filter && filter.startDate && filter.endDate) {
            queryBuilder.andWhere("entity.fromDate BETWEEN :fromDate AND :toDate", {
                fromDate: filter.startDate,
                toDate: filter.endDate,
            });
        }
    }
    async findAllDestinations() {
        return this.destinationRepository.find({
            relations: ["images", "tours", "attractions", "tag", "things"],
        });
    }
    async findOneDestination(id) {
        return this.destinationRepository.findOne({
            where: { id },
            relations: ["images", "tours"],
        });
    }
    async deleteDestination(destinationId) {
        const destination = await this.destinationRepository.findOne({
            where: { id: destinationId },
        });
        if (!destination) {
            throw new Error("Destination not found.");
        }
        await this.destinationRepository.remove(destination);
        return true;
    }
    async findDestinationsByIds(queryRunner, ids) {
        return queryRunner.manager.findBy(destination_entity_1.Destination, { id: (0, typeorm_2.In)(ids) });
    }
};
DestinationService = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(destination_entity_1.Destination)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], DestinationService);
exports.DestinationService = DestinationService;
//# sourceMappingURL=destination.service.js.map