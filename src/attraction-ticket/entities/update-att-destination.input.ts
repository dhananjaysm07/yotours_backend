import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class UpdateAttractionDestinationInput {
  @Field(() => ID)
  attractionId: string;

  @Field(() => ID)
  destinationId: string;
}