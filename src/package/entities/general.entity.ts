import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Destination } from "../../destination/entities/destination.entity";
import { Highlight } from "./highlight.entity";
import { Photo } from "./photo.entity";
import { Itinerary } from "./itinerary.entity";
import { LocationDetails } from "./location.entity";
import { DateDetails } from "./datedetails.entity";

@ObjectType()
@Entity({ name: "PackageGeneral" })
export class PackageGeneral {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  title: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  type: string;

  @Field((type) => [DateDetails])
  @OneToMany(() => DateDetails, (date) => date.packageGeneral, {
    cascade: true,
    eager: true,
  })
  dates: DateDetails[];

  @Field((type) => String)
  @Column({ type: "text", nullable: false })
  summary: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Number, { defaultValue: 1 })
  @Column({ type: "int", default: 1 })
  currentStep: number;

  //destinations will exist already we just need to map them
  @Field((type) => [Destination])
  @ManyToMany(() => Destination)
  @JoinTable()
  destinations: Destination[];

  //create new highlights, photos, itineraries, location details
  @Field((type) => [Highlight])
  @OneToMany(() => Highlight, (highlight) => highlight.packageGeneral, {
    cascade: true,
  })
  highlights: Highlight[];

  @Field((type) => [Photo])
  @OneToMany(() => Photo, (photo) => photo.packageGeneral, { cascade: true })
  photos: Photo[];

  //itineraries will be created by the user
  @Field(() => [Itinerary])
  @OneToMany(() => Itinerary, (itinerary) => itinerary.packageGeneral, {
    cascade: true,
  })
  itineraries: Itinerary[];

  //location details will be created by the user
  @Field(() => LocationDetails)
  @OneToOne(() => LocationDetails, (location) => location.packageGeneral, {
    cascade: true,
  })
  @JoinTable()
  locationDetails: LocationDetails;
}
