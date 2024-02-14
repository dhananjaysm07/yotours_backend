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
exports.Attraction = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const image_entity_1 = require("../../image/entities/image.entity");
const destination_entity_1 = require("../../destination/entities/destination.entity");
const class_validator_1 = require("class-validator");
let Attraction = class Attraction {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Attraction.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "attractionTitle", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "attractionBokunId", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Attraction.prototype, "attractionHyperlink", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.ImageEntity, (image) => image.attraction, {
        eager: true,
        cascade: true,
    }),
    (0, graphql_1.Field)(() => [image_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], Attraction.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => tag_entity_1.Tag, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, (tag) => tag.attractions, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", tag_entity_1.Tag)
], Attraction.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => destination_entity_1.Destination, (destination) => destination.attractions, {}),
    (0, graphql_1.Field)(() => destination_entity_1.Destination),
    __metadata("design:type", destination_entity_1.Destination)
], Attraction.prototype, "destination", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Attraction.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, typeorm_1.Column)({ type: "int", nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Attraction.prototype, "priority", void 0);
Attraction = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Attraction" })
], Attraction);
exports.Attraction = Attraction;
//# sourceMappingURL=attraction.entity.js.map