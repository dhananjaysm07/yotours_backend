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
exports.Highlight = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const general_entity_1 = require("./general.entity");
let Highlight = class Highlight {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Highlight.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Highlight.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Highlight.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Highlight.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => general_entity_1.PackageGeneral, (pkgGeneral) => pkgGeneral.highlights),
    __metadata("design:type", general_entity_1.PackageGeneral)
], Highlight.prototype, "packageGeneral", void 0);
Highlight = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "Highlight" })
], Highlight);
exports.Highlight = Highlight;
//# sourceMappingURL=highlight.entity.js.map