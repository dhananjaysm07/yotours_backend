import { TagService } from "./tag.service";
import { Tag } from "./entities/tag.entity";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
export declare class TagResolver {
    private readonly tagService;
    constructor(tagService: TagService);
    createTag(createTagDto: CreateTagDTO): Promise<Tag>;
    updateTag(updateTagDto: UpdateTagDTO): Promise<Tag>;
    getAllTags(): Promise<Tag[]>;
    getTagById(id: string): Promise<Tag>;
    removeTag(id: string): Promise<void>;
    activateTag(tagId: string): Promise<Tag>;
    deactivateTag(tagId: string): Promise<Tag>;
}
