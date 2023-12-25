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
let AttractionService = class AttractionService {
    constructor(dataSource, attractionRepository) {
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
    findAll() {
        return this.attractionRepository.find({
            where: { active: true },
            relations: ["images", "destination", "tag"],
        });
    }
    findOne(id) {
        return this.attractionRepository.findOne({
            where: { id: id, active: true },
            relations: ["images", "destination", "tag"],
        });
    }
};
AttractionService = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(attraction_entity_1.Attraction)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], AttractionService);
exports.AttractionService = AttractionService;
//# sourceMappingURL=attraction.service.js.map