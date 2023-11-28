import { InputType, PartialType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateDestinationInput } from "./createdestination.input";

@InputType()
export class UpdateDestinationInput extends PartialType(CreateDestinationInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  destinationId: string;
}