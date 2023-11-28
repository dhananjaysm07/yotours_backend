import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty } from "class-validator";
import { CreateAttractionInput } from "./create-attraction.input";

@InputType()
export class UpdateAttractionInput extends PartialType(CreateAttractionInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  attractionId: string;
}
