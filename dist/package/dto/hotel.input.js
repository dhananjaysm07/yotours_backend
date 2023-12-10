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
exports.HotelDetailsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const hotelarray_input_1 = require("./hotelarray.input");
let HotelDetailsInput = class HotelDetailsInput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "hotelName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "days", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], HotelDetailsInput.prototype, "nights", void 0);
__decorate([
    (0, graphql_1.Field)(() => [hotelarray_input_1.HotelArrayInput]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => hotelarray_input_1.HotelArrayInput),
    __metadata("design:type", Array)
], HotelDetailsInput.prototype, "hotelArrays", void 0);
HotelDetailsInput = __decorate([
    (0, graphql_1.InputType)()
], HotelDetailsInput);
exports.HotelDetailsInput = HotelDetailsInput;
//# sourceMappingURL=hotel.input.js.map