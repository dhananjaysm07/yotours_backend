import { ObjectType, Field, ID } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PackageGeneral } from "./general.entity";
import { Sight } from "./sight.entity";
import { HotelDetails } from "./hotel.entity";
import { InterCity } from "./intercity.entity";

@ObjectType()
@Entity({ name: "LocationDetails" })
export class LocationDetails {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //hotel wise details
  @Field(() => [HotelDetails], { nullable: true })
  @OneToMany(() => HotelDetails, (hotel) => hotel.locationDetails, {
    cascade: true,
    eager: true,
  })
  hotelDetails: HotelDetails[];

  //intercity transfers
  @Field(() => [InterCity], { nullable: true })
  @OneToMany(() => InterCity, (intercity) => intercity.locationDetails, {
    cascade: true,
    eager: true,
  })
  intercityTransfers: InterCity[];

  //sightseeing

  @Field(() => [Sight], { nullable: true })
  @OneToMany(() => Sight, (sight) => sight.locationDetails, { cascade: true, eager: true })
  sights: Sight[];

  //transfers
  @Field()
  @Column()
  airportTransfer: boolean;

  @Field()
  @Column()
  localTransfer: boolean;

  @OneToOne(
    () => PackageGeneral,
    (packageGeneral) => packageGeneral.locationDetails
  )
  @JoinColumn()
  packageGeneral: PackageGeneral;
}
