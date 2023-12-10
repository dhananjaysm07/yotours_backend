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
exports.Itinerary = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const general_entity_1 = require("./general.entity");
const textarray_entity_1 = require("./textarray.entity");
let Itinerary = class Itinerary {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Itinerary.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Itinerary.prototype, "dayNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Itinerary.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [textarray_entity_1.TextArray]),
    (0, typeorm_1.OneToMany)(() => textarray_entity_1.TextArray, (textArray) => textArray.itinerary, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Itinerary.prototype, "textArrays", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => general_entity_1.PackageGeneral, (packageGeneral) => packageGeneral.itineraries),
    __metadata("design:type", general_entity_1.PackageGeneral)
], Itinerary.prototype, "packageGeneral", void 0);
Itinerary = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Itinerary" })
], Itinerary);
exports.Itinerary = Itinerary;
//# sourceMappingURL=itinerary.entity.js.map