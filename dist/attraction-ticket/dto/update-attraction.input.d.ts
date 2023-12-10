import { CreateAttractionInput } from "./create-attraction.input";
declare const UpdateAttractionInput_base: import("@nestjs/common").Type<Partial<CreateAttractionInput>>;
export declare class UpdateAttractionInput extends UpdateAttractionInput_base {
    attractionId: string;
}
export {};
