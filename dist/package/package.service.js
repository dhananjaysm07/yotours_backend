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
exports.PackageGeneralService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const general_entity_1 = require("./entities/general.entity");
const highlight_entity_1 = require("./entities/highlight.entity");
const photo_entity_1 = require("./entities/photo.entity");
const itinerary_entity_1 = require("./entities/itinerary.entity");
const location_entity_1 = require("./entities/location.entity");
const destination_service_1 = require("../destination/destination.service");
const textarray_entity_1 = require("./entities/textarray.entity");
const hotel_entity_1 = require("./entities/hotel.entity");
const sight_entity_1 = require("./entities/sight.entity");
const intercity_entity_1 = require("./entities/intercity.entity");
const hotelarray_entity_1 = require("./entities/hotelarray.entity");
const datedetails_entity_1 = require("./entities/datedetails.entity");
const travel_date_entity_1 = require("./entities/travel-date.entity");
let PackageGeneralService = class PackageGeneralService {
    constructor(dataSource, packageGeneralRepository, locationDetailsRepository, highlightRepository, photoRepository, itineraryRepository, dateRepository, travelRepository, destinationService) {
        this.dataSource = dataSource;
        this.packageGeneralRepository = packageGeneralRepository;
        this.locationDetailsRepository = locationDetailsRepository;
        this.highlightRepository = highlightRepository;
        this.photoRepository = photoRepository;
        this.itineraryRepository = itineraryRepository;
        this.dateRepository = dateRepository;
        this.travelRepository = travelRepository;
        this.destinationService = destinationService;
    }
    async create(createPackageGeneralInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        console.log("create package function called");
        try {
            let newPackageGeneral;
            if (createPackageGeneralInput.id) {
                newPackageGeneral = await queryRunner.manager.findOneOrFail(general_entity_1.PackageGeneral, { where: { id: createPackageGeneralInput.id } });
            }
            if (!createPackageGeneralInput.id || newPackageGeneral)
                newPackageGeneral = this.packageGeneralRepository.create(createPackageGeneralInput);
            console.log("step-1");
            console.log("step-2");
            if (createPackageGeneralInput.highlights &&
                createPackageGeneralInput.highlights.length > 0) {
                const highlights = createPackageGeneralInput.highlights.map((highlightInput) => this.highlightRepository.create(highlightInput));
                newPackageGeneral.highlights = await queryRunner.manager.save(highlight_entity_1.Highlight, highlights);
            }
            console.log("step-3");
            if (createPackageGeneralInput.dates &&
                createPackageGeneralInput.dates.length > 0) {
                const dates = await Promise.all(createPackageGeneralInput.dates.map(async (date) => {
                    const travelDates = date.travelDates.map((travelDate) => {
                        return this.travelRepository.create(travelDate);
                    });
                    const dateNew = this.dateRepository.create(date);
                    dateNew.travelDates = await queryRunner.manager.save(travel_date_entity_1.TravelDate, travelDates);
                    return dateNew;
                }));
                newPackageGeneral.dates = await queryRunner.manager.save(datedetails_entity_1.DateDetails, dates);
            }
            console.log("step-4");
            if (createPackageGeneralInput.photos &&
                createPackageGeneralInput.photos.length > 0) {
                const photos = createPackageGeneralInput.photos.map((photoInput) => this.photoRepository.create(photoInput));
                newPackageGeneral.photos = await queryRunner.manager.save(photo_entity_1.Photo, photos);
            }
            console.log("step-5");
            const savedPackageGeneral = await queryRunner.manager.save(general_entity_1.PackageGeneral, newPackageGeneral);
            console.log("saved package general", savedPackageGeneral);
            await queryRunner.commitTransaction();
            return savedPackageGeneral;
        }
        catch (error) {
            console.log("error", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log("Deletion transaction started");
            const packageGeneral = await queryRunner.manager.findOne(general_entity_1.PackageGeneral, {
                where: { id: id },
                relations: ["highlights", "photos", "itineraries"],
            });
            if (!packageGeneral) {
                throw new common_1.NotFoundException(`Package with ID ${id} not found`);
            }
            if (packageGeneral.highlights && packageGeneral.highlights.length > 0) {
                await queryRunner.manager.remove(highlight_entity_1.Highlight, packageGeneral.highlights);
            }
            if (packageGeneral.photos && packageGeneral.photos.length > 0) {
                await queryRunner.manager.remove(photo_entity_1.Photo, packageGeneral.photos);
            }
            if (packageGeneral.itineraries && packageGeneral.itineraries.length > 0) {
                await queryRunner.manager.remove(itinerary_entity_1.Itinerary, packageGeneral.itineraries);
            }
            await queryRunner.manager.remove(general_entity_1.PackageGeneral, packageGeneral);
            console.log("PackageGeneral and related entities deleted");
            await queryRunner.commitTransaction();
            console.log("Deletion transaction committed");
            return "Deleted Successfully";
        }
        catch (error) {
            console.error("Deletion transaction failed", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
            console.log("Query runner released for deletion");
        }
    }
    async findOne(id) {
        const packageGeneral = await this.packageGeneralRepository.findOne({
            where: { id },
            relations: ["destinations", "highlights", "photos"],
        });
        if (!packageGeneral) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
        return packageGeneral;
    }
    async addItineraries(id, itineraryInputs) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const newItineraryIds = [];
        try {
            const packageGeneral = await queryRunner.manager.findOneOrFail(general_entity_1.PackageGeneral, { where: { id }, relations: ["itineraries"] });
            await queryRunner.manager.remove(packageGeneral.itineraries);
            for (const itineraryInput of itineraryInputs) {
                const itinerary = queryRunner.manager.create(itinerary_entity_1.Itinerary, Object.assign(Object.assign({}, itineraryInput), { packageGeneral }));
                const savedItinerary = await queryRunner.manager.save(itinerary_entity_1.Itinerary, itinerary);
                newItineraryIds.push(savedItinerary.id);
                if (itineraryInput.textArrays) {
                    for (const textArrayInput of itineraryInput.textArrays) {
                        let textArray = queryRunner.manager.create(textarray_entity_1.TextArray, Object.assign(Object.assign({}, textArrayInput), { itinerary: savedItinerary }));
                        textArray = await queryRunner.manager.save(textarray_entity_1.TextArray, textArray);
                    }
                }
            }
            const newItineraries = await Promise.all(newItineraryIds.map(async (id) => {
                const itinerary = await queryRunner.manager.findOneOrFail(itinerary_entity_1.Itinerary, {
                    where: { id },
                });
                return itinerary;
            }));
            packageGeneral.itineraries = newItineraries;
            await queryRunner.manager.save(general_entity_1.PackageGeneral, packageGeneral);
            await queryRunner.commitTransaction();
            return newItineraryIds;
        }
        catch (error) {
            console.error("Error in addItineraries: ", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async addLocationDetails(id, locationDetailsInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const newLocationDetailsId = "";
        try {
            const packageGeneral = await queryRunner.manager.findOne(general_entity_1.PackageGeneral, {
                where: { id },
                relations: ["locationDetails"],
            });
            console.log(packageGeneral);
            if (!packageGeneral) {
                throw new Error("Package not found");
            }
            let locationDetails = packageGeneral.locationDetails;
            console.log("Location details found", locationDetails);
            if (!locationDetails) {
                locationDetails = queryRunner.manager.create(location_entity_1.LocationDetails, {
                    packageGeneral: packageGeneral,
                });
            }
            Object.assign(locationDetails, locationDetailsInput);
            console.log("Created location details", locationDetails.id);
            if (locationDetailsInput.hotelDetails) {
                for (const hotelDetail of locationDetailsInput.hotelDetails) {
                    console.log("Creating hotel", hotelDetail);
                    let hotel = locationDetails.hotelDetails.find((h) => h.id === hotelDetail.id);
                    if (!hotel) {
                        hotel = queryRunner.manager.create(hotel_entity_1.HotelDetails, Object.assign(Object.assign({}, hotelDetail), { locationDetails: { id: locationDetails.id } }));
                    }
                    else {
                        Object.assign(hotel, hotelDetail);
                    }
                    hotel = await queryRunner.manager.save(hotel_entity_1.HotelDetails, hotel);
                    if (hotelDetail.hotelArrays) {
                        for (const hotelArrayInput of hotelDetail.hotelArrays) {
                            const hotelArray = queryRunner.manager.create(hotelarray_entity_1.HotelArray, Object.assign(Object.assign({}, hotelArrayInput), { hotelDetails: hotel }));
                            await queryRunner.manager.save(hotelarray_entity_1.HotelArray, hotelArray);
                        }
                    }
                }
            }
            if (locationDetails.sights) {
                for (const sight of locationDetails.sights) {
                    console.log("Creating sight", sight);
                    const sightseeing = queryRunner.manager.create(sight_entity_1.Sight, Object.assign(Object.assign({}, sight), { locationDetails: locationDetails }));
                    await queryRunner.manager.save(sight_entity_1.Sight, sightseeing);
                }
            }
            if (locationDetails.intercityTransfers) {
                for (const intercityTransfer of locationDetails.intercityTransfers) {
                    console.log("Creating intercity transfers", intercityTransfer);
                    const newIntercityTransfer = queryRunner.manager.create(intercity_entity_1.InterCity, Object.assign(Object.assign({}, intercityTransfer), { locationDetails: locationDetails }));
                    await queryRunner.manager.save(intercity_entity_1.InterCity, newIntercityTransfer);
                }
            }
            const savedLocationDetails = await queryRunner.manager.save(location_entity_1.LocationDetails, locationDetails);
            await queryRunner.commitTransaction();
            console.log("Location details created");
            return savedLocationDetails;
        }
        catch (error) {
            console.error("Error in addLocationDetails: ", error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(page = 1, limit = 10) {
        const [results, total] = await this.packageGeneralRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ["destinations", "cities", "highlights", "photos"],
        });
        if (results.length === 0 && page > 1) {
            throw new common_1.NotFoundException(`No results found for page ${page}`);
        }
        return {
            items: results,
            totalCount: total,
        };
    }
    async findOneWithItineraries(id) {
        const packageGeneral = await this.packageGeneralRepository.findOne({
            where: { id },
            relations: ["destinations", "highlights", "photos", "itineraries"],
        });
        if (!packageGeneral) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
        return packageGeneral;
    }
    async findOneWithLocation(id) {
        const packageGeneral = await this.packageGeneralRepository.findOne({
            where: { id },
            relations: [
                "destinations",
                "highlights",
                "photos",
                "itineraries",
                "locationDetails",
                "locationDetails.hotelDetails",
                "locationDetails.hotelDetails.hotelArrays",
            ],
        });
        if (!packageGeneral) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
        return packageGeneral;
    }
};
PackageGeneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(general_entity_1.PackageGeneral)),
    __param(2, (0, typeorm_1.InjectRepository)(location_entity_1.LocationDetails)),
    __param(3, (0, typeorm_1.InjectRepository)(highlight_entity_1.Highlight)),
    __param(4, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __param(5, (0, typeorm_1.InjectRepository)(itinerary_entity_1.Itinerary)),
    __param(6, (0, typeorm_1.InjectRepository)(datedetails_entity_1.DateDetails)),
    __param(7, (0, typeorm_1.InjectRepository)(travel_date_entity_1.TravelDate)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        destination_service_1.DestinationService])
], PackageGeneralService);
exports.PackageGeneralService = PackageGeneralService;
//# sourceMappingURL=package.service.js.map