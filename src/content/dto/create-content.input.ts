import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateContentInput {
  @Field()
  @IsString()
  heroHeading: string;

  @Field()
  @IsString()
  heroSubheading: string;

  @Field()
  @IsString()
  heroImage: string;

  @Field(() => [String])
  @IsString({ each: true })
  footerLinks: string[];

  @Field()
  @IsString()
  footerLogo: string;

  @Field(() => [String])
  @IsString({ each: true })
  socialLinks: string[];

  @Field()
  @IsString()
  tnc: string;
}
