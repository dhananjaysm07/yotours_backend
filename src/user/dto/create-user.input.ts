import { Field, InputType } from "@nestjs/graphql";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsNotEmpty,
} from "class-validator";

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Field(() => [String], { nullable: true })
  roleIds: string[];
}
