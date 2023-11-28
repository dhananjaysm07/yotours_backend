import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class PhotoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;
}
