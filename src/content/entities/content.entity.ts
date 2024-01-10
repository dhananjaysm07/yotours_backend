import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "Content" })
export class Content {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  heroHeading: string;

  @Field({nullable:true})
  @Column()
  heroSubheading: string;

  @Field({nullable:true})
  @Column()
  heroImage: string;

  @Field(() => [String],{nullable:true})
  @Column("simple-array")
  footerLinks: string[];

  @Field({nullable:true})
  @Column()
  footerLogo: string;

  @Field(() => [String],{nullable:true})
  @Column("simple-array")
  socialLinks: string[];

  @Field({nullable:true})
  @Column({ nullable: true })
  tnc: string;

  @Field({nullable:true})
  @Column({ nullable: true })
  privacy: string;
  
  @Field({nullable:true})
  @Column({ nullable: true })
  bokunChannelId: string;

  @Field({nullable:true})
  @Column({ nullable: true })
  leftDiscountImage: string;

  @Field({nullable:true})
  @Column({ nullable: true })
  rightDiscountImage: string;


}
