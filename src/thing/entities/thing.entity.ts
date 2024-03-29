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
@Entity({ name: "Thing" })
export class Thing {
  @Field((type) => ID!)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  thingTitle: string;

  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  thingDescription: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  thingHyperlink: string;

  @OneToMany(() => ImageEntity, (image) => image.thing, {
    eager: true, // if you want to automatically load images with the tour
    cascade: true, // if you want to automatically save images when saving a tour
  })
  @Field(() => [ImageEntity])
  images: ImageEntity[];

  @Field(() => Tag, { nullable: true })
  @ManyToOne(() => Tag, (tag) => tag.things)
  tag: Tag;

  @ManyToOne(() => Destination, (destination) => destination.things, {})
  @Field(() => Destination)
  destination: Destination;

  @Field((type) => Boolean)
  @Column({ type: "boolean", default: true })
  active: boolean;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  @Column({ type: "int", nullable: true, default: 1 })
  priority: number;
}
