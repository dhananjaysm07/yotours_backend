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
exports.CountryAndContinent = exports.ContinentDto = exports.CountryDto = void 0;
const graphql_1 = require("@nestjs/graphql");
let CountryDto = class CountryDto {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CountryDto.prototype, "country", void 0);
CountryDto = __decorate([
    (0, graphql_1.ObjectType)()
], CountryDto);
exports.CountryDto = CountryDto;
let ContinentDto = class ContinentDto {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ContinentDto.prototype, "continent", void 0);
ContinentDto = __decorate([
    (0, graphql_1.ObjectType)()
], ContinentDto);
exports.ContinentDto = ContinentDto;
let CountryAndContinent = class CountryAndContinent {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CountryAndContinent.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CountryAndContinent.prototype, "continent", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CountryAndContinent.prototype, "destinationCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CountryAndContinent.prototype, "tourCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CountryAndContinent.prototype, "attractionCount", void 0);
CountryAndContinent = __decorate([
    (0, graphql_1.ObjectType)()
], CountryAndContinent);
exports.CountryAndContinent = CountryAndContinent;
//# sourceMappingURL=country-continent.dto.js.map