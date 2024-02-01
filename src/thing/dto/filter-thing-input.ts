import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
// import { Tour } from "../entities/tour.entity";
// import { Destination } from "../entities/destination.entity";
import { Thing } from "../entities/thing.entity";

////Note: Destination filter inpput is same as Tour-input-filter

@ObjectType()
export class GetFilteredThingResponse {
  @Field(() => [Thing])
  things: Thing[];

  @Field(() => Int)
  totalCount: number;
}
