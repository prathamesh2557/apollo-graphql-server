import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property()
  title!: string;

  @Field(()=> String)
  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field(()=> String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}