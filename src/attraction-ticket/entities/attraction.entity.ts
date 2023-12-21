import { Field, ID, ObjectType } from "@nestjs/graphql";
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

@ObjectType()
@Entity({ name: "Attraction" })
export class Attraction {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  attractionTitle: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  price: string;

  //addinig currency field
  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  currency: string;
  
  @Field((type) => String)
  @Column({ type: "varchar", nullable: true })
  location: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  attractionBokunId: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  attractionHyperlink: string;

  @OneToMany(() => ImageEntity, (image) => image.attraction, {
    eager: true, // if you want to automatically load images with the tour
    cascade: true, // if you want to automatically save images when saving a tour
  })
  @Field(() => [ImageEntity])
  images: ImageEntity[];

  @Field(()=> Tag, {nullable: true})
  @ManyToOne(() => Tag, (tag) => tag.attractions, { eager: true , nullable: true })
  tag: Tag;

  @ManyToOne(() => Destination, (destination) => destination.attractions, {})
  @Field(() => Destination)
  destination: Destination;

  
}
