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
exports.TourResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_tour_input_1 = require("./dto/create-tour.input");
const tour_entity_1 = require("./entities/tour.entity");
const tour_service_1 = require("./tour.service");
const update_tour_input_1 = require("./dto/update-tour.input");
let TourResolver = class TourResolver {
    constructor(tourService) {
        this.tourService = tourService;
    }
    createTour(createTourInput) {
        return this.tourService.createTour(createTourInput);
    }
    updateTour(updateTourInput) {
        return this.tourService.updateTour(updateTourInput);
    }
    async getTours() {
        return this.tourService.findAll();
    }
    findOne(id) {
        return this.tourService.findOne(id);
    }
<<<<<<< HEAD
    deleteTour(id) {
        return this.tourService.deleteTour(id);
=======
    async deleteTour(tourId) {
        return this.tourService.deleteTour(tourId);
>>>>>>> ca3fba801ca43c074152333bf974066930a7f626
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => tour_entity_1.Tour),
    __param(0, (0, graphql_1.Args)("createTourInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tour_input_1.CreateTourInput]),
    __metadata("design:returntype", void 0)
], TourResolver.prototype, "createTour", null);
__decorate([
    (0, graphql_1.Mutation)(() => tour_entity_1.Tour),
    __param(0, (0, graphql_1.Args)("updateTourInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tour_input_1.UpdateTourInput]),
    __metadata("design:returntype", void 0)
], TourResolver.prototype, "updateTour", null);
__decorate([
    (0, graphql_1.Query)(() => [tour_entity_1.Tour]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TourResolver.prototype, "getTours", null);
__decorate([
    (0, graphql_1.Query)(() => tour_entity_1.Tour),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TourResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => tour_entity_1.Tour),
<<<<<<< HEAD
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
=======
    __param(0, (0, graphql_1.Args)("tourId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
>>>>>>> ca3fba801ca43c074152333bf974066930a7f626
], TourResolver.prototype, "deleteTour", null);
TourResolver = __decorate([
    (0, graphql_1.Resolver)(() => tour_entity_1.Tour),
    __metadata("design:paramtypes", [tour_service_1.TourService])
], TourResolver);
exports.TourResolver = TourResolver;
//# sourceMappingURL=tour.resolver.js.map