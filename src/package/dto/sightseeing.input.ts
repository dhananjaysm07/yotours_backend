import { ObjectType, Field, ID, InputType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class SightseeingInput {

  @Field((type) => String, { nullable: true })
  id?: string;
  @Field((type) => String)
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Field((type) => String)
  @Column({ type: "text", nullable: false })
  description: string;

  @Field()
  @Column("varchar")
  city: string;
}
