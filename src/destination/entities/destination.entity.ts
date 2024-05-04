import { Field, ID, ObjectType, Int, InputType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DestinationStatus } from "../enums/destination-status.enum";
import { Tour } from "src/tour/entities/tour.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Thing } from "src/thing/entities/thing.entity";
import { Min, Max } from "class-validator";
import { Car } from "src/car/entities/car.entity";
import { Package } from "src/Holiday/entities/holiday.entity";

// @InputType()
@ObjectType()
@Entity({ name: "Destination" })
export class Destination {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column()
  destinationName: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  continent: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  country: string;

  //bannerImage
  @Field((type) => String)
  @Column({ type: "text", nullable: true })
  bannerImage: string;

  //banner heading
  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  bannerHeading: string;

  @Field((type) => String)
  @Column({ type: "text", nullable: true })
  description: string;

  @Field((type) => Boolean)
  @Column({ type: "boolean", default: false })
  isPopular: boolean;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fromDate: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  toDate: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fromOccasion: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  toOccasion: string;

  //images
  @OneToMany(() => ImageEntity, (image) => image.destination, {
    eager: true, // if you want to automatically load images with the tour
    cascade: true, // if you want to automatically save images when saving a tour
    nullable: true,
  })
  @Field(() => [ImageEntity])
  images: ImageEntity[];

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  @Column({ type: "int", nullable: true, default: 1 })
  priority: number;

  @Field(() => Tag, { nullable: true })
  @ManyToOne(() => Tag, (tag) => tag.destinations, {
    eager: true,
    nullable: true,
  })
  tag: Tag;

  @Field(() => [Tour])
  @OneToMany(() => Tour, (tour) => tour.destination, { eager: true })
  tours: Tour[];

  @Field(() => [Attraction])
  @OneToMany(() => Attraction, (attraction) => attraction.destination, {
    eager: true,
  })
  attractions: Attraction[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  introduction: string;

  @Field(() => [Thing])
  @OneToMany(() => Thing, (thing) => thing.destination, { eager: true })
  things: Thing[];

  @Field(() => [Car])
  @OneToMany(() => Car, (car) => car.destination, { eager: true })
  cars: Car[];

  @Field(() => [Package], { nullable: true })
  @ManyToMany(() => Package, (question) => question.destinations)
  holidays: Package[];

  // @Field(() => [Package], { nullable: true })
  // @ManyToMany(() => Package, (packages) => packages.destinations, {
  //   eager: true,
  // })
  // @JoinTable({
  //   name: "destinations_packages_id",
  //   joinColumn: {
  //     name: "destinations",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "packages",
  //     referencedColumnName: "id",
  //   },
  // })
  // packages: Package[];
}
