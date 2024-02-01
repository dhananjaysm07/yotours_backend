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
exports.TourService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tour_entity_1 = require("./entities/tour.entity");
const destination_entity_1 = require("../destination/entities/destination.entity");
const tag_entity_1 = require("../tag/entities/tag.entity");
const image_entity_1 = require("../image/entities/image.entity");
const filterQueryClass_1 = require("../global/filterQueryClass");
let TourService = class TourService extends filterQueryClass_1.GenericService {
    constructor(dataSource, tourRepository) {
        super(tourRepository);
        this.dataSource = dataSource;
        this.tourRepository = tourRepository;
    }
    async createTour(createTourInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const newTour = queryRunner.manager.create(tour_entity_1.Tour, createTourInput);
            if (createTourInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: createTourInput.tagId,
                        active: true,
                    },
                });
                newTour.tag = tag;
            }
            if (createTourInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: createTourInput.destinationId,
                    },
                });
                newTour.destination = destination;
            }
            if (createTourInput.imageUrls && createTourInput.imageUrls.length > 0) {
                const imageEntities = createTourInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, {
                        imageUrl: url,
                    });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, imageEntities);
                newTour.images = savedImageEntities;
            }
            const savedTour = await queryRunner.manager.save(tour_entity_1.Tour, newTour);
            console.log("Tour created");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return savedTour;
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
                queryBuilder.andWhere("entity.location = :location", {
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
    async updateTour(updateTourInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Transaction started");
            const tourToUpdate = await queryRunner.manager.findOneOrFail(tour_entity_1.Tour, {
                where: { id: updateTourInput.tourId },
            });
            queryRunner.manager.merge(tour_entity_1.Tour, tourToUpdate, updateTourInput);
            if (updateTourInput.tagId) {
                const tag = await queryRunner.manager.findOneOrFail(tag_entity_1.Tag, {
                    where: {
                        id: updateTourInput.tagId,
                        active: true,
                    },
                });
                tourToUpdate.tag = tag;
            }
            if (updateTourInput.destinationId) {
                const destination = await queryRunner.manager.findOneOrFail(destination_entity_1.Destination, {
                    where: {
                        id: updateTourInput.destinationId,
                    },
                });
                tourToUpdate.destination = destination;
            }
            if (updateTourInput.imageUrls && updateTourInput.imageUrls.length > 0) {
                const newImageEntities = updateTourInput.imageUrls.map((url) => {
                    return queryRunner.manager.create(image_entity_1.ImageEntity, { imageUrl: url });
                });
                const savedImageEntities = await queryRunner.manager.save(image_entity_1.ImageEntity, newImageEntities);
                tourToUpdate.images = savedImageEntities;
            }
            const updatedTour = await queryRunner.manager.save(tour_entity_1.Tour, tourToUpdate);
            console.log("Tour updated");
            await queryRunner.commitTransaction();
            console.log("Transaction committed");
            return updatedTour;
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
    async deleteTour(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tourToDelete = await queryRunner.manager.findOneOrFail(tour_entity_1.Tour, {
                where: { id },
            });
            tourToDelete.active = false;
            await queryRunner.manager.save(tour_entity_1.Tour, tourToDelete);
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
    async activateTour(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tourToDelete = await queryRunner.manager.findOneOrFail(tour_entity_1.Tour, {
                where: { id },
            });
            tourToDelete.active = true;
            await queryRunner.manager.save(tour_entity_1.Tour, tourToDelete);
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
        return this.tourRepository.find({
            where: { active: true },
            relations: ["images", "destination", "tag"],
            order: {
                tourTitle: "ASC",
            },
        });
    }
    findOne(id) {
        return this.tourRepository.findOne({
            where: { id: id },
            relations: ["images", "destination", "tag"],
        });
    }
    async getUniqueCountriesAndContinents() {
        const tours = await this.tourRepository
            .createQueryBuilder("tour")
            .leftJoinAndSelect("tour.destination", "destination")
            .select("destination.country", "country")
            .addSelect("destination.continent", "continent")
            .addSelect("COUNT(DISTINCT tour.id)", "tourCount")
            .where("tour.active = :isActive", { isActive: true })
            .groupBy("destination.country, destination.continent")
            .getRawMany();
        return tours.map((item) => ({
            country: item.country,
            continent: item.continent,
            tourCount: parseInt(item.tourCount),
        }));
    }
};
TourService = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(tour_entity_1.Tour)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], TourService);
exports.TourService = TourService;
//# sourceMappingURL=tour.service.js.map