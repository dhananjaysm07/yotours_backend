import { Field, ID, InputType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class IntercityTransfersInput {

  @Field((type) => String, { nullable: true })
  id?: string; 
  @Field()
  @Column("varchar")
  fromCity: string;

  @Field()
  @Column("varchar")
  toCity: string;

  @Field()
  @Column("varchar")
  mode: string;

  @Field()
  @Column("text")
  modeDescription: string;
}
