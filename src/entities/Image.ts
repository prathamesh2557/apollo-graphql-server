import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { ImageLike } from './ImagesLikes';

@ObjectType()
@Entity()
export class Image {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: 'text', unique: true })
  imagename!: string;

  @Field()
  @Property({ type: 'text', nullable: true })
  imageUrl?: string;

  @Field(() => [ImageLike])
  @OneToMany(() => ImageLike, (like) => like.image)
  likes = new Collection<ImageLike>(this);

  @Field(() => String)
  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
