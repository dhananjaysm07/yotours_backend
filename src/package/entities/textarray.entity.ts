import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PackageGeneral } from "./general.entity";
import { Itinerary } from "./itinerary.entity";
import { HotelDetails } from "./hotel.entity";

@ObjectType()
@Entity({ name: "TextArray" })
export class TextArray {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  section: string; // e.g., 'meals', 'inclusions', 'exclusions'

  @Field(() => [String])
  @Column("simple-array")
  values: string[];

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.textArrays)
  itinerary: Itinerary;
 
}
