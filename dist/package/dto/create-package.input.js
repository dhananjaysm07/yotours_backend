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
exports.CreatePackageGeneralInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const highlight_input_1 = require("./highlight.input");
const photo_input_1 = require("./photo.input");
let CreatePackageGeneralInput = class CreatePackageGeneralInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePackageGeneralInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePackageGeneralInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePackageGeneralInput.prototype, "summary", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePackageGeneralInput.prototype, "currentStep", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePackageGeneralInput.prototype, "destinationIds", void 0);
__decorate([
    (0, graphql_1.Field)(() => [highlight_input_1.HighlightInput]),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => highlight_input_1.HighlightInput),
    __metadata("design:type", Array)
], CreatePackageGeneralInput.prototype, "highlights", void 0);
__decorate([
    (0, graphql_1.Field)(() => [photo_input_1.PhotoInput]),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => photo_input_1.PhotoInput),
    __metadata("design:type", Array)
], CreatePackageGeneralInput.prototype, "photos", void 0);
CreatePackageGeneralInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePackageGeneralInput);
exports.CreatePackageGeneralInput = CreatePackageGeneralInput;
//# sourceMappingURL=create-package.input.js.map