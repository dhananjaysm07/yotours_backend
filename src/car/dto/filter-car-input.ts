import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Car } from "../entities/car.entity";
// import { Tour } from "../entities/tour.entity";
// import { Destination } from "../entities/destination.entity";
// import { Thing } from "../entities/car.entity";

////Note: Destination filter inpput is same as Tour-input-filter

@ObjectType()
export class GetFilteredCarResponse {
  @Field(() => [Car])
  cars: Car[];

  @Field(() => Int)
  totalCount: number;
}
