import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CountryDto {
  @Field()
  country: string;
}

@ObjectType()
export class ContinentDto {
  @Field()
  continent: string;
}

@ObjectType()
export class CountryAndContinent {
  @Field(() => String)
  country: string;

  @Field(() => String)
  continent: string;

  @Field(() => Int,{nullable:true})
  destinationCount?: number;
  @Field(() => Int,{nullable:true})
  tourCount?: number;

  @Field(() => Int,{nullable:true})
  attractionCount?: number;

}