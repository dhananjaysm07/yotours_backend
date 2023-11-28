import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PackageGeneral } from "./general.entity";

@ObjectType()
@Entity({ name: "Photo" })
export class Photo {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "text", nullable: false })
  url: string;

  @Field((type) => PackageGeneral)
  @ManyToOne(() => PackageGeneral, (pkgGeneral) => pkgGeneral.photos)
  packageGeneral: PackageGeneral;
}
