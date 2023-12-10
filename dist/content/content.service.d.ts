import { Content } from "./entities/content.entity";
import { Repository, DataSource } from "typeorm";
import { CreateContentInput } from "./dto/create-content.input";
import { UpdateContentInput } from "./dto/update-content.input";
export declare class ContentService {
    private contentRepository;
    private dataSource;
    constructor(contentRepository: Repository<Content>, dataSource: DataSource);
    create(createContentInput: CreateContentInput): Promise<Content>;
    findOne(): Promise<Content>;
    updateContent(updateContentInput: UpdateContentInput): Promise<Content>;
}
