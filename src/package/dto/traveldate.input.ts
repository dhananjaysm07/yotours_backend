import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsNotEmpty } from "class-validator";

@InputType()
export class TravelDateInput {
  @Field()
  @IsDate()
  @IsNotEmpty()
  fromDate: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  toDate: string;
}
