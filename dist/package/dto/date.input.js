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
exports.DateDetailsInput = exports.TravelDateInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let TravelDateInput = class TravelDateInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TravelDateInput.prototype, "fromDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TravelDateInput.prototype, "toDate", void 0);
TravelDateInput = __decorate([
    (0, graphql_1.InputType)()
], TravelDateInput);
exports.TravelDateInput = TravelDateInput;
let DateDetailsInput = class DateDetailsInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DateDetailsInput.prototype, "bookingFromDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DateDetailsInput.prototype, "bookingToDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [TravelDateInput]),
    __metadata("design:type", Array)
], DateDetailsInput.prototype, "travelDates", void 0);
DateDetailsInput = __decorate([
    (0, graphql_1.InputType)()
], DateDetailsInput);
exports.DateDetailsInput = DateDetailsInput;
//# sourceMappingURL=date.input.js.map