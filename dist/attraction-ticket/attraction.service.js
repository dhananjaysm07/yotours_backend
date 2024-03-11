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
exports.AttractionService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attraction_entity_1 = require("./entities/attraction.entity");
const image_entity_1 = require("../image/entities/image.entity");
const destination_entity_1 = require("../destination/entities/destination.entity");
const tag_entity_1 = require("../tag/entities/tag.entity");
const filterQueryClass_1 = require("../global/filterQueryClass");
let AttractionService = class AttractionService extends filterQueryClass_1.GenericService {
    constructor(dataSource, attractionRepository) {
        super(attractionRepository);
        this.dataSource = dataSource;
        this.attractionRepository = attractionRepository;
    }
    async createAttraction(createAttractionInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const newAttraction = queryRunner.manager.create(attraction_entity_1.Attraction, createAttractionInput);
            if (createAttractionInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: createAttractionInput.tagId,
                        active: true,
                    },
                });
                newAttraction.tag = tag;
            }
            if (createAttractionInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: createAttractionInput.destinationId,
                    },
                });
                newAttraction.destination = destination;
            }
            if (createAttractionInput.imageUrls &&
                createAttractionInput.imageUrls.length > 0) {
                const imageEntities = createAttractionInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, imageEntities);
                newAttraction.images = savedImageEntities;
            }
            const savedAttraction = await queryRunner.manager.save(attraction_entity_1.Attraction, newAttraction);
            console.log("Attraction created");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedAttraction;
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
            .leftJoinAndSelect("entity.destination", "destination")
            .leftJoinAndSelect("entity.images", "ImageEntity");
        queryBuilder.andWhere("entity.active IN (:...activeValues)", {
            activeValues: filter.activeValues || [true],
        });
        if (filter) {
            if (filter.location) {
                queryBuilder.andWhere("destination.destinationName ILIKE :location", {
                    location: `%${filter.location}%`,
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
                queryBuilder.andWhere("destination.continent IN (:...continent)", {
                    continent: filter.continent,
                });
            }
            if (filter.country && filter.country.length > 0) {
                queryBuilder.andWhere("destination.country IN (:...country)", {
                    country: filter.country,
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
    async updateAttraction(updateAttractionInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const attractionToUpdate = await queryRunner.manager.findOneOrFail(attraction_entity_1.Attraction, { where: { id: updateAttractionInput.attractionId } });
            queryRunner.manager.merge(attraction_entity_1.Attraction, attractionToUpdate, updateAttractionInput);
            if (updateAttractionInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: updateAttractionInput.tagId,
                        active: true,
                    },
                });
                attractionToUpdate.tag = tag;
            }
            if (updateAttractionInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: updateAttractionInput.destinationId,
                    },
                });
                attractionToUpdate.destination = destination;
            }
            if (updateAttractionInput.imageUrls &&
                updateAttractionInput.imageUrls.length > 0) {
                const newImageEntities = updateAttractionInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, newImageEntities);
                attractionToUpdate.images = savedImageEntities;
            }
            const savedAttraction = await queryRunner.manager.save(attraction_entity_1.Attraction, attractionToUpdate);
            console.log("Attraction created");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedAttraction;
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
    async deleteAttraction(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tourToDelete = await queryRunner.manager.findOneOrFail(attraction_entity_1.Attraction, {
                where: { id },
            });
            tourToDelete.active = false;
            await queryRunner.manager.save(attraction_entity_1.Attraction, tourToDelete);
            await queryRunner.commitTransaction();
            return { id: tourToDelete.id };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async activateAttraction(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tourToDelete = await queryRunner.manager.findOneOrFail(attraction_entity_1.Attraction, {
                where: { id },
            });
            tourToDelete.active = true;
            await queryRunner.manager.save(attraction_entity_1.Attraction, tourToDelete);
            await queryRunner.commitTransaction();
            return { id: tourToDelete.id };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return this.attractionRepository.find({
            where: { active: true },
            relations: ["images", "destination", "tag"],
            order: {
                priority: "DESC",
                attractionTitle: "ASC",
            },
        });
    }
    findOne(id) {
        return this.attractionRepository.findOne({
            where: { id: id },
            relations: ["images", "destination", "tag"],
        });
    }
    async getUniqueCountriesAndContinents() {
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
    async getAllAttractionLocations() {
        const activeTours = await this.attractionRepository.find({
            where: { active: true },
            select: ["location"],
        });
        const uniqueLocations = [
            ...new Set(activeTours.map((tour) => tour.location)),
        ];
        const sortedLocations = uniqueLocations
            .filter((location) => location !== null)
            .sort();
        return sortedLocations;
    }
};
AttractionService = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(attraction_entity_1.Attraction)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], AttractionService);
exports.AttractionService = AttractionService;
//# sourceMappingURL=attraction.service.js.map