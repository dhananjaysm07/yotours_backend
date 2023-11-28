// src/tour/dto/create-tour.input.ts

import { Field, InputType, Float, ID } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAttractionInput {
  @Field(() => String)
  @IsNotEmpty()
  attractionTitle: string;

  @Field(() => String)
  @IsNotEmpty()
  price: string;

  //add currency field
  //add currency field
  @Field(() => String)
  @IsNotEmpty()
  currency: string;
  
  @Field(() => String)
  @IsNotEmpty()
  location: string;

  @Field(() => String)
  @IsNotEmpty()
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
}
