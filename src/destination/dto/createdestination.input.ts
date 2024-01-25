import { InputType, Field, Int } from "@nestjs/graphql";
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateDestinationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  destinationName: string;

  @Field({ nullable: true })
  @IsString()
  continent: string;

  @Field({ nullable: true })
  @IsString()
  country: string;

  @Field()
  @IsString()
  bannerImage: string;

  @Field()
  @IsString()
  bannerHeading: string;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsString()
  fromDate: string;

  @Field({ nullable: true })
  @IsString()
  toDate: string;

  @Field({ nullable: true })
  @IsString()
  fromOccasion: string;

  @Field({ nullable: true })
  @IsString()
  toOccasion: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  isPopular: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @Field({ nullable: true })
  @IsString()
  tagId: string;

  @Field({ defaultValue: "" })
  @IsString()
  introduction: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 }) // Add this line
  @IsInt()
  priority: number;
}
