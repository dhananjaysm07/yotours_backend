// import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
// import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { HotelData } from "./hotel.entity";
// import { IntercityData } from "./intercity.entity";
// import { SightSeeingData } from "./sight.entity";
// import { Package } from "./holiday.entity";

// @InputType()
// @ObjectType()
// export class Transfers {
//   @Field()
//   airportTransfers: boolean;

//   @Field()
//   localTransfers: boolean;
// }

// @InputType()
// @Entity({ name: "Location" })
// @ObjectType()
// export class LocationData {
//   @Field((type) => ID!)
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Field(() => [HotelData])
//   @OneToMany(() => HotelData, (hotel) => hotel.location, { eager: true })
//   hotels: HotelData[];

//   @Field(() => [IntercityData])
//   @OneToMany(() => IntercityData, (intercity) => intercity.location, {
//     eager: true,
//   })
//   intercityData: IntercityData[];

//   @Field(() => [SightSeeingData])
//   @OneToMany(() => SightSeeingData, (sight) => sight.location, {
//     eager: true,
//   })
//   sightData: SightSeeingData[];

//   @Field(() => Transfers)
//   transfers: Transfers;

//   @OneToOne(() => Package, (packages) => packages.locationData, {})
//   @Field(() => Package)
//   package: Package;
// }
