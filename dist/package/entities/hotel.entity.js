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
exports.HotelDetails = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const location_entity_1 = require("./location.entity");
const hotelarray_entity_1 = require("./hotelarray.entity");
let HotelDetails = class HotelDetails {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], HotelDetails.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], HotelDetails.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], HotelDetails.prototype, "hotelName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], HotelDetails.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], HotelDetails.prototype, "days", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], HotelDetails.prototype, "nights", void 0);
__decorate([
    (0, graphql_1.Field)(() => [hotelarray_entity_1.HotelArray], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => hotelarray_entity_1.HotelArray, (hotelarray) => hotelarray.hotelDetails, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], HotelDetails.prototype, "hotelArrays", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.LocationDetails, (location) => location.hotelDetails),
    __metadata("design:type", location_entity_1.LocationDetails)
], HotelDetails.prototype, "locationDetails", void 0);
HotelDetails = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "HotelDetails" })
], HotelDetails);
exports.HotelDetails = HotelDetails;
//# sourceMappingURL=hotel.entity.js.map