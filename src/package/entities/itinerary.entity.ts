import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PackageGeneral } from "./general.entity";
import { TextArray } from "./textarray.entity";

@ObjectType()
@Entity({ name: "Itinerary" })
export class Itinerary {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  dayNumber: number;

  @Field()
  @Column("text")
  description: string;

  @Field(() => [TextArray])
  @OneToMany(() => TextArray, (textArray) => textArray.itinerary, {
    cascade: true,
  })
  textArrays: TextArray[];

  @ManyToOne(
    () => PackageGeneral,
    (packageGeneral) => packageGeneral.itineraries
  )
  packageGeneral: PackageGeneral;
}
