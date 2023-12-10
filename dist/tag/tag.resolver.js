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
exports.TagResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tag_service_1 = require("./tag.service");
const tag_entity_1 = require("./entities/tag.entity");
const status_result_entity_1 = require("../common/entities/status-result.entity");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
let TagResolver = class TagResolver {
    constructor(tagService) {
        this.tagService = tagService;
    }
    createTag(createTagDto) {
        return this.tagService.createTag(createTagDto);
    }
    updateTag(updateTagDto) {
        return this.tagService.updateTag(updateTagDto);
    }
    getAllTags() {
        return this.tagService.findAllTags();
    }
    getTagById(id) {
        return this.tagService.findOneTag(id);
    }
    removeTag(id) {
        return this.tagService.removeTag(id);
    }
    async activateTag(tagId) {
        return this.tagService.activateTag(tagId);
    }
    async deactivateTag(tagId) {
        return this.tagService.deactivateTag(tagId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => tag_entity_1.Tag),
    __param(0, (0, graphql_1.Args)("createTagDto")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDTO]),
    __metadata("design:returntype", void 0)
], TagResolver.prototype, "createTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => tag_entity_1.Tag),
    __param(0, (0, graphql_1.Args)("updateTagDto")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_dto_1.UpdateTagDTO]),
    __metadata("design:returntype", void 0)
], TagResolver.prototype, "updateTag", null);
__decorate([
    (0, graphql_1.Query)(() => [tag_entity_1.Tag]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TagResolver.prototype, "getAllTags", null);
__decorate([
    (0, graphql_1.Query)(() => tag_entity_1.Tag),
    __param(0, (0, graphql_1.Args)("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagResolver.prototype, "getTagById", null);
__decorate([
    (0, graphql_1.Mutation)(() => status_result_entity_1.StatusResult),
    __param(0, (0, graphql_1.Args)("tagId", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagResolver.prototype, "removeTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => tag_entity_1.Tag),
    __param(0, (0, graphql_1.Args)("tagId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "activateTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => tag_entity_1.Tag),
    __param(0, (0, graphql_1.Args)("tagId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "deactivateTag", null);
TagResolver = __decorate([
    (0, graphql_1.Resolver)(() => tag_entity_1.Tag),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=tag.resolver.js.map