import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocationDetails } from "./location.entity";

@ObjectType()
@Entity({ name: "Intercity" })
export class InterCity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Field()
  @Column("varchar")
  fromCity: string;

  @Field()
  @Column("varchar")
  toCity: string;

  @Field()
  @Column("varchar")
  mode: string;

  @Field()
  @Column("text")
  modeDescription: string;
  @ManyToOne(() => LocationDetails, (location) => location.intercityTransfers)
  locationDetails: LocationDetails;
}