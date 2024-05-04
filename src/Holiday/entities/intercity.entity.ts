// import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { LocationData } from "./location.entity";
// import { Field, ID, ObjectType } from "@nestjs/graphql";
// import { Destination } from "src/destination/entities/destination.entity";

// @Entity({ name: "Intercity" })
// @ObjectType()
// export class IntercityData {
//   @Field((type) => ID!)
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @ManyToOne(() => Destination, (destination) => destination.intercityFrom, {})
//   @Field(() => Destination)
//   fromCity: Destination;

//   @ManyToOne(() => Destination, (destination) => destination.intercityTo, {})
//   @Field(() => Destination)
//   toCity: Destination;

//   @Field()
//   mode: string;

//   @Field()
//   description: string;

//   @ManyToOne(() => LocationData, (location) => location.intercityData, {})
//   @Field(() => LocationData)
//   location: LocationData;
// }
