// update-tour-image.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTourImageDTO } from './create-tour-image.dto';
import { Field, ID } from '@nestjs/graphql';

export class UpdateTourImageDTO extends PartialType(CreateTourImageDTO) {
  @Field(() => ID)
  id: string;
}
