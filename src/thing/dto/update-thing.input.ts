import { InputType, PartialType, Field, ID } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty } from "class-validator";
import { CreateThingInput } from "./create-thing.input";

@InputType()
export class UpdateThingInput extends PartialType(CreateThingInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  thingId: string;
}
