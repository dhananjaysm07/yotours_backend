import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocationDetails } from "./location.entity";
import { HotelArray } from "./hotelarray.entity";

@ObjectType()
@Entity({ name: "HotelDetails" })
export class HotelDetails {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("varchar")
  city: string;

  @Field(() => String)
  @Column("varchar")  
  hotelName: string;

  @Field(() => String)
  @Column("varchar")
  rating: string;

  @Field(() => String)
  @Column("varchar")
  days: string;

  @Field(() => String)
  @Column("varchar")
  nights: string;

  //add realtion with textarray entity
  @Field(() => [HotelArray], { nullable: true })
  @OneToMany(() => HotelArray, (hotelarray) => hotelarray.hotelDetails, {
    cascade: true,
    eager: true,
  })
  hotelArrays: HotelArray[];

  @ManyToOne(() => LocationDetails, (location) => location.hotelDetails)
  locationDetails: LocationDetails;
}
