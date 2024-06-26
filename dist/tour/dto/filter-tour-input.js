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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilteredToursResponse = exports.TourFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const tour_entity_1 = require("../entities/tour.entity");
let TourFilterInput = class TourFilterInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TourFilterInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TourFilterInput.prototype, "priceMin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TourFilterInput.prototype, "priceMax", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TourFilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TourFilterInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TourFilterInput.prototype, "tagName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TourFilterInput.prototype, "continent", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TourFilterInput.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TourFilterInput.prototype, "excludeCountry", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Boolean], { nullable: true }),
    __metadata("design:type", Array)
], TourFilterInput.prototype, "activeValues", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], TourFilterInput.prototype, "ispopular", void 0);
TourFilterInput = __decorate([
    (0, graphql_1.InputType)()
], TourFilterInput);
exports.TourFilterInput = TourFilterInput;
let GetFilteredToursResponse = class GetFilteredToursResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [tour_entity_1.Tour]),
    __metadata("design:type", Array)
], GetFilteredToursResponse.prototype, "tours", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetFilteredToursResponse.prototype, "totalCount", void 0);
GetFilteredToursResponse = __decorate([
    (0, graphql_1.ObjectType)()
], GetFilteredToursResponse);
exports.GetFilteredToursResponse = GetFilteredToursResponse;
//# sourceMappingURL=filter-tour-input.js.map