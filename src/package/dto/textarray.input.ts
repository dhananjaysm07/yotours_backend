import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsArray } from "class-validator";
import { type } from "os";

// Define DTO for TextArray input
@InputType()
export class TextArrayInput {
  @Field((type) => String, { nullable: true })
  @IsString()
  id?: string;
  @Field()
  @IsString()
  section: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  values: string[];
}
