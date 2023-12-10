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
exports.LocationDetailsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const hotel_input_1 = require("./hotel.input");
const intercity_input_1 = require("./intercity.input");
const sightseeing_input_1 = require("./sightseeing.input");
const class_validator_1 = require("class-validator");
let LocationDetailsInput = class LocationDetailsInput {
};
__decorate([
    (0, graphql_1.Field)(() => [hotel_input_1.HotelDetailsInput], { nullable: true }),
    (0, class_validator_1.IsArray)({ message: "Please select a value for hotel details" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], LocationDetailsInput.prototype, "hotelDetails", void 0);
__decorate([
    (0, graphql_1.Field)(() => [intercity_input_1.IntercityTransfersInput], { nullable: true }),
    (0, class_validator_1.IsArray)({ message: "Please select a value for intercity transfers" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], LocationDetailsInput.prototype, "intercityTransfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [sightseeing_input_1.SightseeingInput], { nullable: true }),
    (0, class_validator_1.IsArray)({ message: "Please select a value for sightseeing" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], LocationDetailsInput.prototype, "sights", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsBoolean)({ message: "Please select a value for airport transfer" }),
    __metadata("design:type", Boolean)
], LocationDetailsInput.prototype, "airportTransfer", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsBoolean)({ message: "Please select a value for local transfer" }),
    __metadata("design:type", Boolean)
], LocationDetailsInput.prototype, "localTransfer", void 0);
LocationDetailsInput = __decorate([
    (0, graphql_1.InputType)()
], LocationDetailsInput);
exports.LocationDetailsInput = LocationDetailsInput;
//# sourceMappingURL=location.input.js.map