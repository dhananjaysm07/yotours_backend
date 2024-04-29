// import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
// import { Destination } from "src/destination/entities/destination.entity";
// import {
//   Entity,
//   JoinTable,
//   ManyToMany,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { LocationData } from "./location.entity";

// @InputType()
// @Entity({ name: "Hotel" })
// @ObjectType()
// export class HotelData {
//   @Field((type) => ID!)
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Field(() => [String])
//   meals: string[];

//   @Field()
//   rating: string;

//   @Field()
//   name: string;

//   @Field(() => Int)
//   days: number;

//   @Field(() => Int)
//   nights: number;

//   destinations: string[];

//   @ManyToOne(() => LocationData, (location) => location.hotels, {})
//   @Field(() => LocationData)
//   location: LocationData;
// }
