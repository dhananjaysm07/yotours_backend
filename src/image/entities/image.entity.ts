import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Thing } from "src/thing/entities/thing.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@ObjectType()
@Entity("ImageEntity")
export class ImageEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  imageUrl: string;

  // If an image belongs to one tour
  @ManyToOne(() => Tour, (tour) => tour.images)
  tour: Tour;
  @ManyToOne(() => Attraction, (attraction) => attraction.images)
  attraction: Attraction;
  
  @ManyToOne(() => Thing, (thing) => thing.images)
  thing: Thing;

  // If an image belongs to one tour
  @ManyToOne(() => Destination, (destination) => destination.images)
  destination: Destination;
}
