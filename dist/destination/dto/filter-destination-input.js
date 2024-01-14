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
exports.DestinationFilterInput = exports.GetFilteredDestinationResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const destination_entity_1 = require("../entities/destination.entity");
let GetFilteredDestinationResponse = class GetFilteredDestinationResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [destination_entity_1.Destination]),
    __metadata("design:type", Array)
], GetFilteredDestinationResponse.prototype, "destinations", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetFilteredDestinationResponse.prototype, "totalCount", void 0);
GetFilteredDestinationResponse = __decorate([
    (0, graphql_1.ObjectType)()
], GetFilteredDestinationResponse);
exports.GetFilteredDestinationResponse = GetFilteredDestinationResponse;
let DestinationFilterInput = class DestinationFilterInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DestinationFilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DestinationFilterInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], DestinationFilterInput.prototype, "tagName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], DestinationFilterInput.prototype, "continent", void 0);
DestinationFilterInput = __decorate([
    (0, graphql_1.InputType)()
], DestinationFilterInput);
exports.DestinationFilterInput = DestinationFilterInput;
//# sourceMappingURL=filter-destination-input.js.map