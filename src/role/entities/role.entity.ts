import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { PermissionValue } from "../enums/permission.enum";

@ObjectType()
@Entity({ name: "Role" })
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false, unique: true })
  role: string;

  @Field((type) => [String])
  @Column({
    type: "enum",
    array: true,
    enum: PermissionValue,
    nullable: false,
    default: [],
  })
  permissions: PermissionValue[];
}
