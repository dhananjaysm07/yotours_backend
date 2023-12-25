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
exports.Tour = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const image_entity_1 = require("../../image/entities/image.entity");
const destination_entity_1 = require("../../destination/entities/destination.entity");
let Tour = class Tour {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Tour.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "tourTitle", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "tourHyperlink", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "tourBokunId", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Tour.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.ImageEntity, (image) => image.tour, {
        eager: true,
        cascade: true,
    }),
    (0, graphql_1.Field)(() => [image_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], Tour.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => tag_entity_1.Tag, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, (tag) => tag.tours, { eager: true, nullable: true }),
    __metadata("design:type", tag_entity_1.Tag)
], Tour.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => destination_entity_1.Destination, (destination) => destination.tours, {}),
    (0, graphql_1.Field)(() => destination_entity_1.Destination),
    __metadata("design:type", destination_entity_1.Destination)
], Tour.prototype, "destination", void 0);
Tour = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Tour" })
], Tour);
exports.Tour = Tour;
//# sourceMappingURL=tour.entity.js.map