import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    findAllTags(): Promise<Tag[]>;
    findOneTag(id: string): Promise<Tag>;
    createTag(createTagDto: CreateTagDTO): Promise<Tag>;
    updateTag(updateTagDto: UpdateTagDTO): Promise<Tag>;
    removeTag(id: string): Promise<void>;
    activateTag(id: string): Promise<Tag>;
    deactivateTag(id: string): Promise<Tag>;
}
