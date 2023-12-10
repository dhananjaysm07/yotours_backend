import { ContentService } from "./content.service";
import { CreateContentInput } from "./dto/create-content.input";
import { Content } from "./entities/content.entity";
import { UpdateContentInput } from "./dto/update-content.input";
export declare class ContentResolver {
    private contentService;
    constructor(contentService: ContentService);
    getContent(): Promise<Content>;
    createContent(createContentInput: CreateContentInput): Promise<Content>;
    updateContent(updateContentInput: UpdateContentInput): Promise<Content>;
}
