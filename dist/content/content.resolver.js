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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const content_service_1 = require("./content.service");
const create_content_input_1 = require("./dto/create-content.input");
const content_entity_1 = require("./entities/content.entity");
const update_content_input_1 = require("./dto/update-content.input");
let ContentResolver = class ContentResolver {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async getContent() {
        return this.contentService.findOne();
    }
    async createContent(createContentInput) {
        return this.contentService.create(createContentInput);
    }
    async updateContent(updateContentInput) {
        return this.contentService.updateContent(updateContentInput);
    }
};
__decorate([
    (0, graphql_1.Query)(() => content_entity_1.Content, { name: "getContent" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentResolver.prototype, "getContent", null);
__decorate([
    (0, graphql_1.Mutation)(() => content_entity_1.Content),
    __param(0, (0, graphql_1.Args)("createContentInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_input_1.CreateContentInput]),
    __metadata("design:returntype", Promise)
], ContentResolver.prototype, "createContent", null);
__decorate([
    (0, graphql_1.Mutation)(() => content_entity_1.Content),
    __param(0, (0, graphql_1.Args)("updateContentInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_content_input_1.UpdateContentInput]),
    __metadata("design:returntype", Promise)
], ContentResolver.prototype, "updateContent", null);
ContentResolver = __decorate([
    (0, graphql_1.Resolver)(() => content_entity_1.Content),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentResolver);
exports.ContentResolver = ContentResolver;
//# sourceMappingURL=content.resolver.js.map