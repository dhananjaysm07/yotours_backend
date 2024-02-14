import { InputType, Field, ID, Int } from "@nestjs/graphql";
import { IsString, IsOptional, IsUUID, IsArray, IsInt } from "class-validator";

@InputType()
export class CreateCarInput {
  @Field()
  @IsString()
  carTitle: string;

  @Field()
  @IsString()
  carDescription: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  carHyperlink?: string;

  // Assuming that images are created separately and then related by ID
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  // Assuming that the tag and destination are selected by ID
  @Field(() => ID, { nullable: true })
  tagId?: string;

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 }) // Add this line
  @IsInt()
  priority: number;
}
