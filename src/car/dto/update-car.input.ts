import { InputType, PartialType, Field, ID } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty } from "class-validator";
import { CreateCarInput } from "./create-car.input";

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  carId: string;
}
