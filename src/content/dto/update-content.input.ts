import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID, IsString } from "class-validator";

@InputType()
export class UpdateContentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  heroHeading?: string;

  @Field({ nullable: true })
  @IsString()
  heroSubheading?: string;

  @Field({ nullable: true })
  @IsString()
  heroImage?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  footerLinks?: string[];

  @Field({ nullable: true })
  @IsString()
  footerLogo?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  socialLinks?: string[];
}
