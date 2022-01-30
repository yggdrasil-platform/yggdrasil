import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';

// Models
import BaseModel from './BaseModel';

@ObjectType()
@Schema({
  toObject: {
    virtuals: true,
    versionKey: false,
  },
})
export default class User {
  // export default class User extends BaseModel {
  @Prop()
  createdAt: Date;

  @Field({
    description: `The user's first name`,
  })
  @Prop()
  firstName: string;

  @Field(() => ID, {
    description: `The user's identifier`,
  })
  _id: string;

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
