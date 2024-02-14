import { Field, ObjectType } from "@nestjs/graphql";
import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Car } from "src/car/entities/car.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Thing } from "src/thing/entities/thing.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@ObjectType()
@Entity()
export class Tag {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: true }) // Adding active field with a default value
  active: boolean;

  // Relation with Tour
  @OneToMany(() => Tour, (tour) => tour.tag)
  tours: Tour[];

  @OneToMany(() => Attraction, (attraction) => attraction.tag)
  attractions: Attraction[];

  @OneToMany(() => Thing, (thing) => thing.tag)
  things: Thing[];

  @OneToMany(() => Thing, (thing) => thing.tag)
  cars: Car[];

  @OneToMany(() => Destination, (destination) => destination.tag)
  destinations: Destination[];
}
