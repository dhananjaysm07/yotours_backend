import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
// import { Tour } from "../entities/tour.entity";
// import { Destination } from "../entities/destination.entity";
import { Attraction } from "./attraction.entity";

////Note: Destination filter inpput is same as Tour-input-filter

@ObjectType()
export class GetFilteredAttractionResponse {
  @Field(() => [Attraction])
  attractions: Attraction[];

  @Field(() => Int)
  totalCount: number;
}
