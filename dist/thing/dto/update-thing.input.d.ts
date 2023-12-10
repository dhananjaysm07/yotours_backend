import { CreateThingInput } from "./create-thing.input";
declare const UpdateThingInput_base: import("@nestjs/common").Type<Partial<CreateThingInput>>;
export declare class UpdateThingInput extends UpdateThingInput_base {
    thingId: string;
}
export {};
