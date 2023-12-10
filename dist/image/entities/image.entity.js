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
exports.ImageEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const attraction_entity_1 = require("../../attraction-ticket/entities/attraction.entity");
const destination_entity_1 = require("../../destination/entities/destination.entity");
const thing_entity_1 = require("../../thing/entities/thing.entity");
const tour_entity_1 = require("../../tour/entities/tour.entity");
const typeorm_1 = require("typeorm");
let ImageEntity = class ImageEntity {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ImageEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_entity_1.Tour, (tour) => tour.images),
    __metadata("design:type", tour_entity_1.Tour)
], ImageEntity.prototype, "tour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attraction_entity_1.Attraction, (attraction) => attraction.images),
    __metadata("design:type", attraction_entity_1.Attraction)
], ImageEntity.prototype, "attraction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => thing_entity_1.Thing, (thing) => thing.images),
    __metadata("design:type", thing_entity_1.Thing)
], ImageEntity.prototype, "thing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => destination_entity_1.Destination, (destination) => destination.images),
    __metadata("design:type", destination_entity_1.Destination)
], ImageEntity.prototype, "destination", void 0);
ImageEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("ImageEntity")
], ImageEntity);
exports.ImageEntity = ImageEntity;
//# sourceMappingURL=image.entity.js.map