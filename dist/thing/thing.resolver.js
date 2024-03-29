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
exports.ThingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const thing_entity_1 = require("./entities/thing.entity");
const thing_service_1 = require("./thing.service");
const create_thing_input_1 = require("./dto/create-thing.input");
const update_thing_input_1 = require("./dto/update-thing.input");
const filter_tour_input_1 = require("../tour/dto/filter-tour-input");
const filter_thing_input_1 = require("./dto/filter-thing-input");
let ThingResolver = class ThingResolver {
    constructor(thingService) {
        this.thingService = thingService;
    }
    createThing(createThingInput) {
        return this.thingService.createThing(createThingInput);
    }
    async getThings() {
        return this.thingService.findAll();
    }
    async getThingsForCMS() {
        return this.thingService.findAllForCMS();
    }
    getThing(id) {
        return this.thingService.findOne(id);
    }
    async updateThing(updateThingInput) {
        return this.thingService.updateThing(updateThingInput);
    }
    deleteThing(id) {
        return this.thingService.deleteThing(id);
    }
    activateThing(id) {
        return this.thingService.activateThing(id);
    }
    async getFilteredThings(page, loadCount, filter) {
        const { data, count } = await this.thingService.getAllFiltered(filter, page, loadCount);
        return { things: data, totalCount: count };
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => thing_entity_1.Thing),
    __param(0, (0, graphql_1.Args)("createThingInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thing_input_1.CreateThingInput]),
    __metadata("design:returntype", void 0)
], ThingResolver.prototype, "createThing", null);
__decorate([
    (0, graphql_1.Query)(() => [thing_entity_1.Thing]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThingResolver.prototype, "getThings", null);
__decorate([
    (0, graphql_1.Query)(() => [thing_entity_1.Thing]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThingResolver.prototype, "getThingsForCMS", null);
__decorate([
    (0, graphql_1.Query)(() => thing_entity_1.Thing),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThingResolver.prototype, "getThing", null);
__decorate([
    (0, graphql_1.Mutation)(() => thing_entity_1.Thing),
    __param(0, (0, graphql_1.Args)("updateThingInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_thing_input_1.UpdateThingInput]),
    __metadata("design:returntype", Promise)
], ThingResolver.prototype, "updateThing", null);
__decorate([
    (0, graphql_1.Mutation)(() => thing_entity_1.Thing),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThingResolver.prototype, "deleteThing", null);
__decorate([
    (0, graphql_1.Mutation)(() => thing_entity_1.Thing),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThingResolver.prototype, "activateThing", null);
__decorate([
    (0, graphql_1.Query)(() => filter_thing_input_1.GetFilteredThingResponse),
    __param(0, (0, graphql_1.Args)("page", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("loadCount", { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)("filter")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, filter_tour_input_1.TourFilterInput]),
    __metadata("design:returntype", Promise)
], ThingResolver.prototype, "getFilteredThings", null);
ThingResolver = __decorate([
    (0, graphql_1.Resolver)(() => thing_entity_1.Thing),
    __metadata("design:paramtypes", [thing_service_1.ThingService])
], ThingResolver);
exports.ThingResolver = ThingResolver;
//# sourceMappingURL=thing.resolver.js.map