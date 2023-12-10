import { CreateTagDTO } from './create-tag.dto';
declare const UpdateTagDTO_base: import("@nestjs/common").Type<Partial<CreateTagDTO>>;
export declare class UpdateTagDTO extends UpdateTagDTO_base {
    id: string;
    name?: string;
    active?: boolean;
}
export {};
