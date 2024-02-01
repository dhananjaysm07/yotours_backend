import { ID, InputType, PartialType } from "@nestjs/graphql";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { CreateRoleDto } from "./create-role.dto";
import { Field } from "@nestjs/graphql";
@InputType()
export class EditRoleDto extends PartialType(CreateRoleDto) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  roleID: string;
}
