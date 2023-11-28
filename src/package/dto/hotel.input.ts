import { InputType, Field } from "@nestjs/graphql";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { HotelArrayInput } from "./hotelarray.input";

@InputType()
export class HotelDetailsInput {
  @Field(() => String, { nullable: true })
  id?: string; 

  @Field(() => String)
  city: string;

  @Field(() => String)
  hotelName: string;

  @Field(() => String)
  rating: string;

  @Field(() => String)
  days: string;

  @Field(() => String)
  nights: string;

  @Field(() => [HotelArrayInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelArrayInput)
  hotelArrays: HotelArrayInput[];
}
