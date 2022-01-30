import { Prop } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class BaseModel {
  @Field(() => ID, {
    description: `The user's identifier`,
  })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
