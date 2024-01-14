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


@InputType()
export class DestinationFilterInput {
 @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field(() => [String], { nullable: true })
  tagName?: string[];

  @Field(() => [String], { nullable: true })
  continent?: string[];

  
}
