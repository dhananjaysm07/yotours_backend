import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
// import { Tour } from "../entities/tour.entity";
import { Destination } from "../entities/destination.entity";

////Note: Destination filter inpput is same as Tour-input-filter

@ObjectType()
export class GetFilteredDestinationResponse {
  @Field(() => [Destination])
  destinations: Destination[];

  @Field(() => Int)
  totalCount: number;
}
