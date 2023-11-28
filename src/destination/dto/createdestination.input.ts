import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateDestinationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  destinationName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  continent?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;
  
  @Field()
  @IsNotEmpty()
  @IsString()
  bannerImage: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  bannerHeading: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  isPopular: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  tagId?: string;
}
