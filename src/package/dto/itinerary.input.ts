import { InputType, Field } from "@nestjs/graphql";
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { TextArray } from "../entities/textarray.entity";
import { TextArrayInput } from "./textarray.input";
import { Type } from "class-transformer";

@InputType()
export class ItineraryInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  @IsNumber()
  dayNumber: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => [TextArrayInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TextArrayInput)
  textArrays: TextArrayInput[];
}
