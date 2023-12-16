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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const content_entity_1 = require("./entities/content.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ContentService = class ContentService {
    constructor(contentRepository, dataSource) {
        this.contentRepository = contentRepository;
        this.dataSource = dataSource;
    }
    async create(createContentInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingContent = await this.contentRepository
                .createQueryBuilder("content")
                .orderBy("content.id", "ASC")
                .getOne();
            const newContent = this.contentRepository.create(createContentInput);
            const savedContent = await queryRunner.manager.save(content_entity_1.Content, newContent);
            await queryRunner.commitTransaction();
            return savedContent;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findOne() {
        const content = await this.contentRepository
            .createQueryBuilder("content")
            .orderBy("content.id", "ASC")
            .getOne();
        if (!content) {
            throw new common_1.NotFoundException(`Content not found`);
        }
        return content;
    }
    async updateContent(updateContentInput) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingContent = await this.contentRepository.findOne({
                where: { id: updateContentInput.id },
            });
            if (!existingContent) {
                throw new common_1.NotFoundException("Content not found");
            }
            const updatedContent = this.contentRepository.merge(existingContent, updateContentInput);
            const savedContent = await queryRunner.manager.save(content_entity_1.Content, updatedContent);
            await queryRunner.commitTransaction();
            return savedContent;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ContentService);
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map