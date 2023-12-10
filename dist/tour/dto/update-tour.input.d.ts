import { CreateTourInput } from "./create-tour.input";
declare const UpdateTourInput_base: import("@nestjs/common").Type<Partial<CreateTourInput>>;
export declare class UpdateTourInput extends UpdateTourInput_base {
    tourId: string;
}
export {};
