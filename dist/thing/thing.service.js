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
exports.ThingService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("../image/entities/image.entity");
const destination_entity_1 = require("../destination/entities/destination.entity");
const tag_entity_1 = require("../tag/entities/tag.entity");
const thing_entity_1 = require("./entities/thing.entity");
let ThingService = class ThingService {
    constructor(dataSource, thingRepository) {
        this.dataSource = dataSource;
        this.thingRepository = thingRepository;
    }
    async createThing(createThingInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const newThing = queryRunner.manager.create(thing_entity_1.Thing, createThingInput);
            if (createThingInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: createThingInput.tagId,
                        active: true,
                    },
                });
                newThing.tag = tag;
            }
            if (createThingInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: createThingInput.destinationId,
                    },
                });
                newThing.destination = destination;
            }
            if (createThingInput.imageUrls && createThingInput.imageUrls.length > 0) {
                const imageEntities = createThingInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, imageEntities);
                newThing.images = savedImageEntities;
            }
            const savedThing = await queryRunner.manager.save(thing_entity_1.Thing, newThing);
            console.log("Thing created");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedThing;
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
    async updateThing(updateThingInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const thingToUpdate = await queryRunner.manager.findOneOrFail(thing_entity_1.Thing, {
                where: { id: updateThingInput.thingId },
            });
            queryRunner.manager.merge(thing_entity_1.Thing, thingToUpdate, updateThingInput);
            if (updateThingInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: updateThingInput.tagId,
                        active: true,
                    },
                });
                thingToUpdate.tag = tag;
            }
            if (updateThingInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: updateThingInput.destinationId,
                    },
                });
                thingToUpdate.destination = destination;
            }
            if (updateThingInput.imageUrls && updateThingInput.imageUrls.length > 0) {
                const newImageEntities = updateThingInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, newImageEntities);
                thingToUpdate.images = savedImageEntities;
            }
            const savedThing = await queryRunner.manager.save(thing_entity_1.Thing, thingToUpdate);
            console.log("Thing Updated");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedThing;
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
    async deleteThing(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const thingToDelete = await queryRunner.manager.findOneOrFail(thing_entity_1.Thing, {
                where: { id },
            });
            thingToDelete.active = false;
            await queryRunner.manager.save(thing_entity_1.Thing, thingToDelete);
            await queryRunner.commitTransaction();
            return { id: thingToDelete.id };
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
        return this.thingRepository.find({
            where: { active: true },
            relations: ["images", "destination", "tag"],
        });
    }
    findOne(id) {
        return this.thingRepository.findOne({
            where: { id: id, active: true },
            relations: ["images", "destination", "tag"],
        });
    }
};
ThingService = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(thing_entity_1.Thing)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], ThingService);
exports.ThingService = ThingService;
//# sourceMappingURL=thing.service.js.map