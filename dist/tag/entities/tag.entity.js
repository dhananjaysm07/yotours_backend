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
exports.Tag = void 0;
const graphql_1 = require("@nestjs/graphql");
const attraction_entity_1 = require("../../attraction-ticket/entities/attraction.entity");
const destination_entity_1 = require("../../destination/entities/destination.entity");
const thing_entity_1 = require("../../thing/entities/thing.entity");
const tour_entity_1 = require("../../tour/entities/tour.entity");
const typeorm_1 = require("typeorm");
let Tag = class Tag {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Tag.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Tag.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tour_entity_1.Tour, (tour) => tour.tag),
    __metadata("design:type", Array)
], Tag.prototype, "tours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attraction_entity_1.Attraction, (attraction) => attraction.tag),
    __metadata("design:type", Array)
], Tag.prototype, "attractions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thing_entity_1.Thing, (thing) => thing.tag),
    __metadata("design:type", Array)
], Tag.prototype, "things", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thing_entity_1.Thing, (thing) => thing.tag),
    __metadata("design:type", Array)
], Tag.prototype, "cars", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => destination_entity_1.Destination, (destination) => destination.tag),
    __metadata("design:type", Array)
], Tag.prototype, "destinations", void 0);
Tag = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map