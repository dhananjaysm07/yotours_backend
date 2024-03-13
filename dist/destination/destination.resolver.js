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
exports.DestinationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const destination_entity_1 = require("../destination/entities/destination.entity");
const destination_service_1 = require("./destination.service");
const createdestination_input_1 = require("./dto/createdestination.input");
const updatedestination_input_1 = require("./dto/updatedestination.input");
const filter_destination_input_1 = require("./dto/filter-destination-input");
const filter_tour_input_1 = require("../tour/dto/filter-tour-input");
const country_continent_dto_1 = require("./dto/country-continent.dto");
let DestinationResolver = class DestinationResolver {
    constructor(destinationService) {
        this.destinationService = destinationService;
    }
    createDestination(createDestinationInput) {
        return this.destinationService.createDestination(createDestinationInput);
    }
    updateDestination(updateDestinationInput) {
        return this.destinationService.updateDestination(updateDestinationInput);
    }
    async getDestinations(isTourActive) {
        return this.destinationService.findAllDestinations(isTourActive);
    }
    async getDestination(id) {
        return this.destinationService.findOneDestination(id);
    }
    async getFilteredDestination(page, loadCount, filter) {
        const { data, count } = await this.destinationService.getAllFiltered(filter, page, loadCount);
        return { destinations: data, totalCount: count };
    }
    async deleteDestination(destinationId) {
        return await this.destinationService.deleteDestination(destinationId);
    }
    async getCountries() {
        return this.destinationService.getCountries();
    }
    async getContinents() {
        return this.destinationService.getContinents();
    }
    async getCountriesAndContinents() {
        return this.destinationService.getCountriesAndContinents();
    }
    async getCountriesAndContinentsForCMS() {
        return this.destinationService.getCountriesAndContinentsForCMS();
    }
    async getUniqueDestinationLocations() {
        return this.destinationService.getAllDestinationLocations();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => destination_entity_1.Destination),
    __param(0, (0, graphql_1.Args)("createDestinationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdestination_input_1.CreateDestinationInput]),
    __metadata("design:returntype", void 0)
], DestinationResolver.prototype, "createDestination", null);
__decorate([
    (0, graphql_1.Mutation)(() => destination_entity_1.Destination),
    __param(0, (0, graphql_1.Args)("updateDestinationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatedestination_input_1.UpdateDestinationInput]),
    __metadata("design:returntype", void 0)
], DestinationResolver.prototype, "updateDestination", null);
__decorate([
    (0, graphql_1.Query)(() => [destination_entity_1.Destination]),
    __param(0, (0, graphql_1.Args)("isTourActive", { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getDestinations", null);
__decorate([
    (0, graphql_1.Query)(() => destination_entity_1.Destination, { nullable: true }),
    __param(0, (0, graphql_1.Args)("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getDestination", null);
__decorate([
    (0, graphql_1.Query)(() => filter_destination_input_1.GetFilteredDestinationResponse),
    __param(0, (0, graphql_1.Args)("page", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("loadCount", { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)("filter")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, filter_tour_input_1.TourFilterInput]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getFilteredDestination", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)("destinationId", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "deleteDestination", null);
__decorate([
    (0, graphql_1.Query)((returns) => [country_continent_dto_1.CountryDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getCountries", null);
__decorate([
    (0, graphql_1.Query)((returns) => [country_continent_dto_1.ContinentDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getContinents", null);
__decorate([
    (0, graphql_1.Query)((returns) => [country_continent_dto_1.CountryAndContinent]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getCountriesAndContinents", null);
__decorate([
    (0, graphql_1.Query)((returns) => [country_continent_dto_1.CountryAndContinent]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getCountriesAndContinentsForCMS", null);
__decorate([
    (0, graphql_1.Query)(() => [String]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getUniqueDestinationLocations", null);
DestinationResolver = __decorate([
    (0, graphql_1.Resolver)(() => destination_entity_1.Destination),
    __metadata("design:paramtypes", [destination_service_1.DestinationService])
], DestinationResolver);
exports.DestinationResolver = DestinationResolver;
//# sourceMappingURL=destination.resolver.js.map