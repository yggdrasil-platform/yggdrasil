import { Prop, Schema } from '@nestjs/mongoose';

// Models
import BaseModel from './BaseModel';

@Schema({
  toObject: {
    versionKey: false,
  },
})
export default class Authentication extends BaseModel {
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  userId: string;
}
