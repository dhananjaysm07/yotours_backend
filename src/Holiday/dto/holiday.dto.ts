// package.dto.ts

import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
// import { Photo } from "../entities/holiday.entity";
// import { Transfers } from "../entities/location.entity";
// import { Transfers } from "../entities/holiday.entity";

@InputType()
export class CityDataInp {
  @Field(() => String)
  name: string;

  @Field(() => String)
  id: string;
}

@InputType()
export class DurationDataInput {
  @Field(() => Int)
  days: number;

  @Field(() => Int)
  nights: number;

  @Field(() => Int)
  validity: number;

  @Field()
  validityUnit: string;
}

@InputType()
export class TravelDateInput {
  @Field()
  fromDate: string;

  @Field()
  toDate: string;
}

@InputType()
export class DatesDataInput {
  @Field()
  bookingFromDate: string;

  @Field()
  bookingToDate: string;

  @Field(() => [TravelDateInput])
  travelDates: TravelDateInput[];
}

@InputType()
export class HighlightInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  url: string;
}

@InputType()
export class PhotoInput {
  @Field(() => String)
  url: string;
}

@InputType()
export class SummaryDataInput {
  @Field(() => [String])
  inclusions: string[];

  @Field(() => [String])
  exclusions: string[];

  @Field(() => [HighlightInput])
  highlights: HighlightInput[];

  @Field()
  summary: string;

  @Field(() => [PhotoInput])
  photos: PhotoInput[];
}

@InputType()
export class PricingDataInput {
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

@InputType()
export class PolicyInput {
  @Field()
  option: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateGeneralDetailInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => [String], { nullable: true })
  themes?: string[];

  @Field(() => [String], { nullable: true })
  preference?: string[];

  @Field(() => [String], { nullable: false })
  destinationIds?: string[];

  @Field(() => DurationDataInput, { nullable: true })
  durationData?: DurationDataInput;

  @Field(() => [DatesDataInput], { nullable: true })
  datesData?: DatesDataInput[];

  @Field(() => SummaryDataInput, { nullable: true })
  summaryData?: SummaryDataInput;
}

@InputType()
export class UpdateItineraryInput {
  @Field(() => [DayWiseItineraryInput])
  daywiseItinerary: DayWiseItineraryInput[];
}

@InputType()
export class UpdateLanguagesInput {
  @Field(() => [String])
  languages: string[];
}

@InputType()
export class UpdatePricingInput {
  @Field(() => PricingDataInput)
  pricingData: PricingDataInput;
}

@InputType()
export class UpdateCancellationPolicyInput {
  @Field(() => PolicyInput)
  cancellationPolicy: PolicyInput;
}

@InputType()
export class DayWiseItineraryInput {
  @Field(() => Int, { nullable: true })
  day: number;

  @Field()
  description: string;

  @Field(() => [CityDataInp], { nullable: false })
  cities: CityDataInp[];

  @Field(() => [String], { nullable: true })
  meals: string[];

  @Field(() => [String], { nullable: true })
  inclusions: string[];

  @Field(() => [String], { nullable: true })
  exclusions: string[];
}

@InputType()
export class HotelDataInput {
  @Field(() => [CityDataInp], { nullable: false })
  cities: CityDataInp[];

  @Field(() => [String])
  meals: string[];

  @Field()
  rating: string;

  @Field()
  name: string;

  @Field(() => Int)
  days: number;

  @Field(() => Int)
  nights: number;
}

@InputType()
export class IntercityDataInput {
  @Field(() => CityDataInp)
  fromCity: CityDataInp;

  @Field(() => CityDataInp)
  toCity: CityDataInp;

  @Field()
  mode: string;

  @Field()
  description: string;
}

@InputType()
export class SightSeeingDataInput {
  @Field(() => CityDataInp)
  city: CityDataInp;

  @Field(() => [String])
  sights: string[];
}

@InputType()
export class TransfersInput {
  @Field()
  airportTransfers: boolean;

  @Field()
  localTransfers: boolean;
}

@InputType()
export class LocationDataInput {
  @Field(() => [HotelDataInput])
  hotelsData: HotelDataInput[];

  @Field(() => [IntercityDataInput])
  intercityData: IntercityDataInput[];

  @Field(() => [SightSeeingDataInput])
  sightseeingData: SightSeeingDataInput[];

  @Field(() => TransfersInput)
  transfers: TransfersInput;
}

@InputType()
export class UpdateLocationInput {
  @Field(() => LocationDataInput)
  locationData: LocationDataInput;
}
