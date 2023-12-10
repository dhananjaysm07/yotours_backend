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
exports.DateDetails = void 0;
const typeorm_1 = require("typeorm");
const travel_date_entity_1 = require("./travel-date.entity");
const general_entity_1 = require("./general.entity");
const graphql_1 = require("@nestjs/graphql");
let DateDetails = class DateDetails {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DateDetails.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DateDetails.prototype, "bookingFromDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DateDetails.prototype, "bookingToDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [travel_date_entity_1.TravelDate]),
    (0, typeorm_1.OneToMany)(() => travel_date_entity_1.TravelDate, (travelDate) => travelDate.dateDetails, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], DateDetails.prototype, "travelDates", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => general_entity_1.PackageGeneral, (packageGeneral) => packageGeneral.dates),
    __metadata("design:type", general_entity_1.PackageGeneral)
], DateDetails.prototype, "packageGeneral", void 0);
DateDetails = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "DateDetails" })
], DateDetails);
exports.DateDetails = DateDetails;
//# sourceMappingURL=datedetails.entity.js.map