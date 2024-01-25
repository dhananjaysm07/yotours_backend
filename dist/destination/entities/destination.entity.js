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
exports.Destination = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const tour_entity_1 = require("../../tour/entities/tour.entity");
const image_entity_1 = require("../../image/entities/image.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const attraction_entity_1 = require("../../attraction-ticket/entities/attraction.entity");
const thing_entity_1 = require("../../thing/entities/thing.entity");
const class_validator_1 = require("class-validator");
let Destination = class Destination {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Destination.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false, unique: true }),
    __metadata("design:type", String)
], Destination.prototype, "destinationName", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "continent", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "bannerImage", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "bannerHeading", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Destination.prototype, "isPopular", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "fromDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "toDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "fromOccasion", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "toOccasion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.ImageEntity, (image) => image.destination, {
        eager: true,
        cascade: true,
        nullable: true,
    }),
    (0, graphql_1.Field)(() => [image_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], Destination.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, typeorm_1.Column)({ type: "int", nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Destination.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => tag_entity_1.Tag, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, (tag) => tag.destinations, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", tag_entity_1.Tag)
], Destination.prototype, "tag", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tour_entity_1.Tour]),
    (0, typeorm_1.OneToMany)(() => tour_entity_1.Tour, (tour) => tour.destination, { eager: true }),
    __metadata("design:type", Array)
], Destination.prototype, "tours", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attraction_entity_1.Attraction]),
    (0, typeorm_1.OneToMany)(() => attraction_entity_1.Attraction, (attraction) => attraction.destination, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Destination.prototype, "attractions", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Destination.prototype, "introduction", void 0);
__decorate([
    (0, graphql_1.Field)(() => [thing_entity_1.Thing]),
    (0, typeorm_1.OneToMany)(() => thing_entity_1.Thing, (thing) => thing.destination, { eager: true }),
    __metadata("design:type", Array)
], Destination.prototype, "things", void 0);
Destination = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Destination" })
], Destination);
exports.Destination = Destination;
//# sourceMappingURL=destination.entity.js.map