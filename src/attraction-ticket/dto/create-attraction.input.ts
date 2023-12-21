// src/tour/dto/create-tour.input.ts

import { Field, InputType, Float, ID } from "@nestjs/graphql";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

@InputType()
export class CreateAttractionInput {
  @Field(() => String)
  @IsString()
  attractionTitle: string;

  @Field(() => String)
  @IsString()
  price: string;

  //add currency field
  //add currency field
  @Field(() => String)
  @IsString()
  currency: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => String, { nullable: true })
  @IsString()
  attractionHyperlink: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field(() => ID, { nullable: true })
  tagId?: string;

  @Field(() => String)
  @IsString()
  attractionBokunId: string;
}
