import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean } from 'class-validator';
@InputType()
export class CreateTagDTO {
  @Field(()=>String)
  @IsNotEmpty()
  name: string;

  // Here you can provide a default value if you want all new tags to be active when created
  @Field(()=>Boolean)
  @IsBoolean()
  active: boolean = true;
}
