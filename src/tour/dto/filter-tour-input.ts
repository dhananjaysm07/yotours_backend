import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Tour } from "../entities/tour.entity";

@InputType()
export class TourFilterInput {
  @Field({ nullable: true })
  location?: string;

  @Field(() => Int, { nullable: true })
  priceMin?: number;

  @Field(() => Int, { nullable: true })
  priceMax?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field(() => [String], { nullable: true })
  tagName?: string[];

  @Field(() => [String], { nullable: true })
  continent?: string[];

  @Field(() => [String], { nullable: true })
  country?: string[];

  @Field(() => [String], { nullable: true })
  excludeCountry?: string[];

  @Field(() => [Boolean], { nullable: true })
  activeValues?: boolean[];

  @Field(() => Boolean, { nullable: true })
  ispopular?: boolean;
}

@ObjectType()
export class GetFilteredToursResponse {
  @Field(() => [Tour])
  tours: Tour[];

  @Field(() => Int)
  totalCount: number;
}
