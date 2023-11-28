import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TravelDate } from "./travel-date.entity";
import { PackageGeneral } from "./general.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name: "DateDetails" })
export class DateDetails {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column()
  bookingFromDate: string;

  @Field((type) => String)
  @Column()
  bookingToDate: string;

  @Field((type) => [TravelDate])
  @OneToMany(() => TravelDate, (travelDate) => travelDate.dateDetails, {
    cascade: true,
  })
  travelDates: TravelDate[];

  //set relation with packagegeneral
  @ManyToOne(() => PackageGeneral, (packageGeneral) => packageGeneral.dates)
  packageGeneral: PackageGeneral;
}
