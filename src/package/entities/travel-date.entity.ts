import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DateDetails } from "./datedetails.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name:"TravelDate"})
export class TravelDate {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  fromDate: string;

  @Field()
  @Column()
  toDate: string;

  @ManyToOne(() => DateDetails, (dateDetails) => dateDetails.travelDates)
  dateDetails: DateDetails;
}
