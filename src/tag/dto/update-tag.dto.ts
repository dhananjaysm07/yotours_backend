import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateTagDTO } from './create-tag.dto';

@InputType()
export class UpdateTagDTO extends PartialType(CreateTagDTO) {
  @Field(() => ID)
  id: string;

  
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
