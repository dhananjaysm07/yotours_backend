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
exports.LocationDetails = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const general_entity_1 = require("./general.entity");
const sight_entity_1 = require("./sight.entity");
const hotel_entity_1 = require("./hotel.entity");
const intercity_entity_1 = require("./intercity.entity");
let LocationDetails = class LocationDetails {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], LocationDetails.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [hotel_entity_1.HotelDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => hotel_entity_1.HotelDetails, (hotel) => hotel.locationDetails, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], LocationDetails.prototype, "hotelDetails", void 0);
__decorate([
    (0, graphql_1.Field)(() => [intercity_entity_1.InterCity], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => intercity_entity_1.InterCity, (intercity) => intercity.locationDetails, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], LocationDetails.prototype, "intercityTransfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [sight_entity_1.Sight], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => sight_entity_1.Sight, (sight) => sight.locationDetails, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], LocationDetails.prototype, "sights", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], LocationDetails.prototype, "airportTransfer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], LocationDetails.prototype, "localTransfer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => general_entity_1.PackageGeneral, (packageGeneral) => packageGeneral.locationDetails),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", general_entity_1.PackageGeneral)
], LocationDetails.prototype, "packageGeneral", void 0);
LocationDetails = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "LocationDetails" })
], LocationDetails);
exports.LocationDetails = LocationDetails;
//# sourceMappingURL=location.entity.js.map