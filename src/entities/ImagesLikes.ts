import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Image } from './Image';

@ObjectType()
@Entity()
export class ImageLike {
  static findOne(_arg0: { where: { user: { id: number; }; image: { id: number; }; }; }) {
      throw new Error('Method not implemented.');
  }
  save() {
      throw new Error('Method not implemented.');
  }
  static find(_arg0: { where: { image: number; }; relations: string[]; }) {
      throw new Error('Method not implemented.');
  }
  static count(_arg0: { where: { image: number; }; }) {
      throw new Error('Method not implemented.');
  }
  @Field()
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Image)
  image!: Image;

  @ManyToOne(() => User)
  user!: User;
}
