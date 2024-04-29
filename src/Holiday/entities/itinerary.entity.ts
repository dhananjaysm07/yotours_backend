// ////////////////////////////////////////////////////////////////////////////////////////////////////

// import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
// import { Destination } from "src/destination/entities/destination.entity";
// import {
//   Entity,
//   JoinTable,
//   ManyToMany,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { Package } from "./holiday.entity";

// ////////Itinerary////////////////////////////////////////////////////////////////////////////////////
// @InputType()
// @ObjectType()
// @Entity({ name: "DayWiseItinerary" })
// export class DayWiseItinerary {
//   @Field((type) => ID!)
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Field(() => Int)
//   day: number;

//   @Field()
//   description: string;

//   @Field(() => [Destination])
//   @ManyToMany(() => Destination, (destination) => destination.itineraries)
//   @JoinTable({
//     name: "destination_Itinerary_id",
//     joinColumn: {
//       name: "itineraries",
//       referencedColumnName: "id",
//     },
//     inverseJoinColumn: {A
//       name: "cities",
//       referencedColumnName: "id",
//     },
//   })
//   cities: Destination[];

//   @Field(() => [String])
//   meals: string[];

//   @Field(() => [String])
//   inclusions: string[];

//   @Field(() => [String])
//   exclusions: string[];

//   @ManyToOne(() => Package, (packages) => packages.daywiseItinerary, {})
//   @Field(() => Package)
//   package: Package;
// }
