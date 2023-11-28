import { InputType, Field, ID } from "@nestjs/graphql";

import { HotelDetailsInput } from "./hotel.input";
import { IntercityTransfersInput } from "./intercity.input";
import { SightseeingInput } from "./sightseeing.input";
import { IsArray, IsBoolean, IsOptional, ValidateNested } from "class-validator";

@InputType()
export class LocationDetailsInput {
  // hotel wise details
  @Field(() => [HotelDetailsInput], { nullable: true })
  @IsArray({ message: "Please select a value for hotel details" })
  @IsOptional()
  @ValidateNested({ each: true })
  hotelDetails: HotelDetailsInput[];

  // intercity transfers
  @Field(() => [IntercityTransfersInput], { nullable: true })
  @IsArray({ message: "Please select a value for intercity transfers" })
  @IsOptional()
  @ValidateNested({ each: true })
  intercityTransfers: IntercityTransfersInput[];

  // sightseeing
  @Field(() => [SightseeingInput], { nullable: true })
  @IsArray({ message: "Please select a value for sightseeing" })
  @IsOptional()
  @ValidateNested({ each: true })
  sights: SightseeingInput[];

  // transfers
  @Field({ nullable: true })
  @IsBoolean({ message: "Please select a value for airport transfer" })
  airportTransfer: boolean;

  @Field({ nullable: true })
  @IsBoolean({ message: "Please select a value for local transfer" })
  localTransfer: boolean;
}
