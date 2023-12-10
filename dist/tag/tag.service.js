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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./entities/tag.entity");
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async findAllTags() {
        return this.tagRepository.find();
    }
    async findOneTag(id) {
        return this.tagRepository.findOne({ where: { id: id } });
    }
    async createTag(createTagDto) {
        const tag = this.tagRepository.create(createTagDto);
        return this.tagRepository.save(tag);
    }
    async updateTag(updateTagDto) {
        const tag = await this.tagRepository.preload(Object.assign({ id: updateTagDto.id }, updateTagDto));
        if (!tag) {
            throw new Error("Tag not found");
        }
        return this.tagRepository.save(tag);
    }
    async removeTag(id) {
        const tag = await this.tagRepository.findOne({ where: { id: id } });
        if (!tag) {
            throw new Error("Tag not found");
        }
        await this.tagRepository.remove(tag);
    }
    async activateTag(id) {
        const tag = await this.tagRepository.findOne({ where: { id: id } });
        if (!tag) {
            throw new Error("Tag not found");
        }
        tag.active = true;
        return this.tagRepository.save(tag);
    }
    async deactivateTag(id) {
        const tag = await this.tagRepository.findOne({ where: { id: id } });
        if (!tag) {
            throw new Error("Tag not found");
        }
        tag.active = false;
        return this.tagRepository.save(tag);
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map