// package.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, ID, Int, InputType } from "@nestjs/graphql";
import { Destination } from "src/destination/entities/destination.entity";

@ObjectType()
export class CityDataInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  id: string;
}

@ObjectType()
export class DurationData {
  @Field(() => Int)
  days: number;

  @Field(() => Int)
  nights: number;

  @Field(() => Int)
  validity: number;

  @Field()
  validityUnit: string;
}

@ObjectType()
export class DatesData {
  @Field()
  bookingFromDate: string;

  @Field()
  bookingToDate: string;

  @Field(() => [TravelDate])
  travelDates: TravelDate[];
}

@ObjectType()
export class TravelDate {
  @Field()
  fromDate: string;

  @Field()
  toDate: string;
}

@ObjectType()
export class Photo {
  @Field(() => String)
  url: string;
}

@ObjectType()
export class SummaryData {
  @Field(() => [String])
  inclusions: string[];

  @Field(() => [String])
  exclusions: string[];

  @Field(() => [Highlight])
  highlights: Highlight[];

  @Field()
  summary: string;

  @Field(() => [Photo])
  photos: Photo[];
}

@ObjectType()
export class Highlight {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  url: string;
}

@ObjectType()
export class PricingData {
  @Field()
  currency: string;

  @Field()
  type: string;

  @Field(() => Int)
  adultPrice: number;

  @Field(() => Int)
  childPrice: number;

  @Field(() => Int)
  maxMembers: number;
}

@ObjectType()
export class Policy {
  @Field()
  option: string;

  @Field()
  description: string;
}

@ObjectType()
export class HotelData {
  @Field(() => [String], { nullable: true })
  meals: string[];

  @Field(() => String, { nullable: true })
  rating: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  days: number;

  @Field(() => Int, { nullable: true })
  nights: number;

  @Field(() => [CityDataInput])
  cities: CityDataInput[];
}

@ObjectType()
export class IntercityData {
  @Field(() => CityDataInput, { nullable: true })
  fromCity: CityDataInput;

  @Field(() => CityDataInput, { nullable: true })
  toCity: CityDataInput;

  @Field(() => String, { nullable: true })
  mode: string;

  @Field(() => String, { nullable: true })
  description: string;
}

@ObjectType()
export class SightSeeingData {
  @Field(() => CityDataInput, { nullable: true })
  city: CityDataInput;

  @Field(() => [String], { nullable: true })
  sights: string[];
}

@ObjectType()
export class Transfers {
  @Field(() => Boolean, { nullable: true })
  airportTransfers: boolean;

  @Field(() => Boolean, { nullable: true })
  localTransfers: boolean;
}

@ObjectType()
export class LocationData {
  @Field(() => [HotelData], { nullable: true })
  hotels: HotelData[];

  @Field(() => [IntercityData], { nullable: true })
  intercityData: IntercityData[];

  @Field(() => [SightSeeingData], { nullable: true })
  sightData: SightSeeingData[];

  @Field(() => Transfers, { nullable: true })
  transfers: Transfers;
}

@ObjectType()
export class DayWiseItinerary {
  @Field(() => Int, { nullable: true })
  day: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [CityDataInput])
  cities: CityDataInput[];

  @Field(() => [String], { nullable: true })
  meals: string[];

  @Field(() => [String], { nullable: true })
  inclusions: string[];

  @Field(() => [String], { nullable: true })
  exclusions: string[];
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////Package/////////////////////////////////////////////////////////////////////////////////////////////
@ObjectType()
@Entity({ name: "Package" })
export class Package {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  type: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  themes: string[];

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  preference: string[];

  // @Field(() => [Destination], { nullable: true })
  // @ManyToMany(() => Destination, (destination) => destination.packages, {})
  // @JoinTable({
  //   name: "destinations_packages_id",
  //   joinColumn: {
  //     name: "packages",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "destinations",
  //     referencedColumnName: "id",
  //   },
  // })
  // destinations: Destination[];
  @Field(() => [Destination], { nullable: true })
  @ManyToMany(() => Destination, (destination) => destination.holidays)
  @JoinTable()
  destinations: Destination[];

  @Field(() => DurationData, { nullable: true })
  @Column("jsonb", { nullable: true })
  durationData: DurationData;

  @Field(() => [DatesData], { nullable: true })
  @Column("jsonb", { nullable: true })
  datesData: DatesData[];

  @Field(() => SummaryData, { nullable: true })
  @Column("jsonb", { nullable: true })
  summaryData: SummaryData;

  @Field(() => PricingData, { nullable: true })
  @Column("jsonb", { nullable: true })
  pricingData: PricingData;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  languages: string[];

  @Field(() => Policy, { nullable: true })
  @Column("jsonb", { nullable: true })
  cancellationPolicy: Policy;

  @Field(() => [DayWiseItinerary], { nullable: true })
  @Column("jsonb", { nullable: true })
  daywiseItinerary: DayWiseItinerary[];

  @Field(() => LocationData, { nullable: true })
  @Column("jsonb", { nullable: true })
  locationData: LocationData;
}
