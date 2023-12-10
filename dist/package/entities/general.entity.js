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
exports.PackageGeneral = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const destination_entity_1 = require("../../destination/entities/destination.entity");
const highlight_entity_1 = require("./highlight.entity");
const photo_entity_1 = require("./photo.entity");
const itinerary_entity_1 = require("./itinerary.entity");
const location_entity_1 = require("./location.entity");
const datedetails_entity_1 = require("./datedetails.entity");
let PackageGeneral = class PackageGeneral {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PackageGeneral.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], PackageGeneral.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], PackageGeneral.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [datedetails_entity_1.DateDetails]),
    (0, typeorm_1.OneToMany)(() => datedetails_entity_1.DateDetails, (date) => date.packageGeneral, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], PackageGeneral.prototype, "dates", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], PackageGeneral.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PackageGeneral.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PackageGeneral.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number, { defaultValue: 1 }),
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], PackageGeneral.prototype, "currentStep", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [destination_entity_1.Destination]),
    (0, typeorm_1.ManyToMany)(() => destination_entity_1.Destination),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], PackageGeneral.prototype, "destinations", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [highlight_entity_1.Highlight]),
    (0, typeorm_1.OneToMany)(() => highlight_entity_1.Highlight, (highlight) => highlight.packageGeneral, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], PackageGeneral.prototype, "highlights", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [photo_entity_1.Photo]),
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, (photo) => photo.packageGeneral, { cascade: true }),
    __metadata("design:type", Array)
], PackageGeneral.prototype, "photos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [itinerary_entity_1.Itinerary]),
    (0, typeorm_1.OneToMany)(() => itinerary_entity_1.Itinerary, (itinerary) => itinerary.packageGeneral, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], PackageGeneral.prototype, "itineraries", void 0);
__decorate([
    (0, graphql_1.Field)(() => location_entity_1.LocationDetails),
    (0, typeorm_1.OneToOne)(() => location_entity_1.LocationDetails, (location) => location.packageGeneral, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", location_entity_1.LocationDetails)
], PackageGeneral.prototype, "locationDetails", void 0);
PackageGeneral = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "PackageGeneral" })
], PackageGeneral);
exports.PackageGeneral = PackageGeneral;
//# sourceMappingURL=general.entity.js.map