import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "src/tag/entities/tag.entity";
import { ImageEntity } from "src/image/entities/image.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Max, Min } from "class-validator";

@ObjectType()
@Entity({ name: "Tour" })
export class Tour {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  tourTitle: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  price: string;
  //add currency field
  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  currency: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  location: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  tourHyperlink: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  tourBokunId: string;

  @Field((type) => Boolean)
  @Column({ type: "boolean", default: true })
  active: boolean;

  @OneToMany(() => ImageEntity, (image) => image.tour, {
    eager: true, // if you want to automatically load images with the tour
    cascade: true, // if you want to automatically save images when saving a tour
  })
  @Field(() => [ImageEntity])
  images: ImageEntity[];

  @Field(() => Tag, { nullable: true })
  @ManyToOne(() => Tag, (tag) => tag.tours, { eager: true, nullable: true })
  tag: Tag;

  @ManyToOne(() => Destination, (destination) => destination.tours, {})
  @Field(() => Destination)
  destination: Destination;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  @Column({ type: "int", nullable: true, default: 1 })
  priority: number;
}
