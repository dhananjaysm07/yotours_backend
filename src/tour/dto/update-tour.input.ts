// src/tour/dto/update-tour.input.ts

import { InputType, Field, ID, PartialType } from "@nestjs/graphql";
import {
  IsUUID,
  IsOptional,
  IsArray,
  IsString,
  IsNotEmpty,
} from "class-validator";
import { CreateTourInput } from "./create-tour.input";

@InputType()
export class UpdateTourInput  extends PartialType(CreateTourInput){
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  tourId: string;
}
