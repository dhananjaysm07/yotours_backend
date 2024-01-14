import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateContentInput {
  @Field({nullable:true})
  @IsString()
  heroHeading: string;

  @Field({nullable:true})
  @IsString()
  heroSubheading: string;

  @Field({nullable:true})
  @IsString()
  heroImage: string;

  @Field(() => [String],{nullable:true})
  @IsString({ each: true })
  footerLinks: string[];

  @Field({nullable:true})
  @IsString()
  footerLogo: string;

  @Field(() => [String],{nullable:true})
  @IsString({ each: true })
  socialLinks: string[];

  @Field({nullable:true})
  @IsString()
  tnc: string;

  @Field({nullable:true})
  @IsString()
  privacy: string;

  @Field({nullable:true})
  @IsString()
  about: string;

  @Field({nullable:true})
  @IsString()
  agent: string;

  @Field({nullable:true})
  @IsString()
  bokunChannelId: string;


  @Field({nullable:true})
  @IsString()
  leftDiscountImage: string;

  @Field({nullable:true})
  @IsString()
  rightDiscountImage: string;
  
}
