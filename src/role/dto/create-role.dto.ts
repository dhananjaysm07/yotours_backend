import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsArray, IsNotEmpty } from "class-validator";
import { PermissionValue } from "../enums/permission.enum";

@InputType()
export class CreateRoleDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  role: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  permissions: PermissionValue[];
}
