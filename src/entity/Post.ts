import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
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

  @ManyToOne(() => Post, post => post.children, { nullable: true })
  parent!: Post | null;

  @Column({ nullable: true })
  parentId!: number | null;

  @OneToMany(() => Post, post => post.parent)
  children!: Post[];
}
