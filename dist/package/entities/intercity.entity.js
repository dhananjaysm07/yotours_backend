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
exports.InterCity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const location_entity_1 = require("./location.entity");
let InterCity = class InterCity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], InterCity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], InterCity.prototype, "fromCity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], InterCity.prototype, "toCity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], InterCity.prototype, "mode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], InterCity.prototype, "modeDescription", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.LocationDetails, (location) => location.intercityTransfers),
    __metadata("design:type", location_entity_1.LocationDetails)
], InterCity.prototype, "locationDetails", void 0);
InterCity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Intercity" })
], InterCity);
exports.InterCity = InterCity;
//# sourceMappingURL=intercity.entity.js.map