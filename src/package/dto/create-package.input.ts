import { InputType, Field, ID } from "@nestjs/graphql";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { HighlightInput } from "./highlight.input";
import { PhotoInput } from "./photo.input";
import {
  DateDetails,
  // DateDetailsInputType,
} from "../entities/datedetails.entity";
import { DateDetailsInput } from "./date.input";

@InputType()
export class CreatePackageGeneralInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  summary: string;

  @Field()
  @IsNumber()
  currentStep: number;

  @Field((type) => [String])
  @IsArray()
  @IsString({ each: true }) // Validate each element as a string
  inclusion: string[];

  @Field((type) => [String])
  @IsArray()
  @IsString({ each: true }) // Validate each element as a string
  exclusion: string[];

  @Field((type) => [DateDetailsInput])
  @IsArray()
  dates: DateDetailsInput[];

  @Field(() => [ID])
  @IsArray()
  destinationIds: string[];

  @Field(() => [HighlightInput])
  @ValidateNested({ each: true })
  @Type(() => HighlightInput)
  highlights: HighlightInput[];

  @Field(() => [PhotoInput])
  @ValidateNested({ each: true })
  @Type(() => PhotoInput)
  photos: PhotoInput[];
}
