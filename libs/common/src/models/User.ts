import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

// Models
import BaseModel from './BaseModel';

@ObjectType()
@Schema({
  toObject: {
    versionKey: false,
  },
})
export default class User extends BaseModel {
  @Field({
    description: `The user's first name`,
  })
  @Prop()
  firstName: string;

  @Field({
    description: `The user's last name`,
  })
  @Prop()
  lastName: string;

  @Field({
    description: `The user's unique username`,
  })
  @Prop({
    required: true,
    unique: true,
  })
  username: string;
}
