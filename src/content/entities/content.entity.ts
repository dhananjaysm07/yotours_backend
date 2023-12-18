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

  @Field()
  @Column()
  heroSubheading: string;

  @Field()
  @Column()
  heroImage: string;

  @Field(() => [String])
  @Column("simple-array")
  footerLinks: string[];

  @Field()
  @Column()
  footerLogo: string;

  @Field(() => [String])
  @Column("simple-array")
  socialLinks: string[];

  @Field()
  @Column({ nullable: true })
  tnc: string;

  @Field()
  @Column({ nullable: true })
  bokunChannelId: string;
}
