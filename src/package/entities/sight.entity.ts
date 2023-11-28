import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { LocationDetails } from "./location.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "Sights" })
export class Sight {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;


  @ManyToOne(() => LocationDetails, (location) => location.sights)
  locationDetails: LocationDetails;
}
