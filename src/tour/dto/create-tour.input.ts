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
export class CreateTourInput {
  @Field(() => String)
  @IsNotEmpty()
  tourTitle: string;

  @Field(() => String)
  @IsNotEmpty()
  price: string;

  @Field(() => String)
  @IsNotEmpty()
  location: string;

  //add currency field
  @Field(() => String)
  @IsNotEmpty()
  currency: string;

  @Field(() => String)
  @IsNotEmpty()
  tourHyperlink: string;

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
}
