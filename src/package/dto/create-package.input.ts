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

@InputType()
export class CreatePackageGeneralInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  summary: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  currentStep: number;

  @Field(() => [ID])
  @IsArray()
  destinationIds: string[];

  @Field(()=>[HighlightInput])
  @ValidateNested({ each: true })
  @Type(() => HighlightInput)
  highlights: HighlightInput[];

  @Field(()=>[PhotoInput])
  @ValidateNested({ each: true })
  @Type(() => PhotoInput)
  photos: PhotoInput[];
}
