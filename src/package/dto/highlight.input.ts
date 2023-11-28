import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class HighlightInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString( )
  @IsNotEmpty()
  url: string;

}