import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ID, Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  body!: string;
}
