import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PackageGeneral } from "./general.entity";

@ObjectType()
@Entity({ name: "Highlight" })
export class Highlight {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  title: string;

  @Field((type) => String)
  @Column({ type: "text", nullable: false })
  description: string;
  
  @Field((type) => String)
  @Column({ type: "text", nullable: false })
  url: string;

  @ManyToOne(() => PackageGeneral, (pkgGeneral) => pkgGeneral.highlights)
  packageGeneral: PackageGeneral;
}
