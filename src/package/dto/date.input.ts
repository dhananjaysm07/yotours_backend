// GraphQL Input Type for DateDetails
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class TravelDateInput {
  @Field(() => String)
  fromDate: string;

  @Field(() => String)
  toDate: string;
}

@InputType()
export class DateDetailsInput {
  @Field(() => String)
  bookingFromDate: string;

  @Field(() => String)
  bookingToDate: string;

  @Field(() => [TravelDateInput])
  travelDates: TravelDateInput[];
}
