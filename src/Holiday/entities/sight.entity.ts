// import { Field, ID, ObjectType } from "@nestjs/graphql";
// import { Destination } from "src/destination/entities/destination.entity";
// import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { LocationData } from "./location.entity";

// @Entity({ name: "Sight" })
// @ObjectType()
// export class SightSeeingData {
//   @Field((type) => ID!)
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @ManyToOne(() => Destination, (destination) => destination.sight, {})
//   @Field(() => Destination)
//   destination: Destination;

//   @Field(() => [String])
//   sights: string[];

//   @ManyToOne(() => LocationData, (location) => location.sightData, {})
//   @Field(() => LocationData)
//   location: LocationData;
// }
