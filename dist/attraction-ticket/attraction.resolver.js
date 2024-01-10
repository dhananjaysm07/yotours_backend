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
exports.AttractionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const attraction_entity_1 = require("./entities/attraction.entity");
const attraction_service_1 = require("./attraction.service");
const create_attraction_input_1 = require("./dto/create-attraction.input");
const update_attraction_input_1 = require("./dto/update-attraction.input");
const attraction_filter_1 = require("./entities/attraction-filter");
const filter_tour_input_1 = require("../tour/dto/filter-tour-input");
let AttractionResolver = class AttractionResolver {
    constructor(attractionService) {
        this.attractionService = attractionService;
    }
    createAttraction(createAttractionInput) {
        return this.attractionService.createAttraction(createAttractionInput);
    }
    async getAttractions() {
        return this.attractionService.findAll();
    }
    getAttraction(id) {
        return this.attractionService.findOne(id);
    }
    async getFilteredAttractions(page, loadCount, filter) {
        const { data, count } = await this.attractionService.getAllFiltered(filter, page, loadCount);
        return { attractions: data, totalCount: count };
    }
    async updateAttraction(updateAttractionInput) {
        return this.attractionService.updateAttraction(updateAttractionInput);
    }
    deleteAttraction(id) {
        return this.attractionService.deleteAttraction(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => attraction_entity_1.Attraction),
    __param(0, (0, graphql_1.Args)("createAttractionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attraction_input_1.CreateAttractionInput]),
    __metadata("design:returntype", void 0)
], AttractionResolver.prototype, "createAttraction", null);
__decorate([
    (0, graphql_1.Query)(() => [attraction_entity_1.Attraction]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttractionResolver.prototype, "getAttractions", null);
__decorate([
    (0, graphql_1.Query)(() => attraction_entity_1.Attraction),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttractionResolver.prototype, "getAttraction", null);
__decorate([
    (0, graphql_1.Query)(() => attraction_filter_1.GetFilteredAttractionResponse),
    __param(0, (0, graphql_1.Args)("page", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("loadCount", { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)("filter")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, filter_tour_input_1.TourFilterInput]),
    __metadata("design:returntype", Promise)
], AttractionResolver.prototype, "getFilteredAttractions", null);
__decorate([
    (0, graphql_1.Mutation)(() => attraction_entity_1.Attraction),
    __param(0, (0, graphql_1.Args)("updateAttractionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_attraction_input_1.UpdateAttractionInput]),
    __metadata("design:returntype", Promise)
], AttractionResolver.prototype, "updateAttraction", null);
__decorate([
    (0, graphql_1.Mutation)(() => attraction_entity_1.Attraction),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttractionResolver.prototype, "deleteAttraction", null);
AttractionResolver = __decorate([
    (0, graphql_1.Resolver)(() => attraction_entity_1.Attraction),
    __metadata("design:paramtypes", [attraction_service_1.AttractionService])
], AttractionResolver);
exports.AttractionResolver = AttractionResolver;
//# sourceMappingURL=attraction.resolver.js.map