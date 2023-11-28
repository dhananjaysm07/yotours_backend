import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { HotelDetails } from "./hotel.entity";

@ObjectType()
@Entity({ name: "HotelArray" })
export class HotelArray {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  section: string; // e.g., 'meals', 'inclusions', 'exclusions'

  @Field(() => [String])
  @Column("simple-array")
  values: string[];

  @ManyToOne(() => HotelDetails, (hotel) => hotel.hotelArrays)
  hotelDetails: HotelDetails;
}
