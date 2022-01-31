import { SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';

// Constants
import { SALT_ROUNDS } from '@libs/common/constants';

// Interfaces
import { ISeed } from '@test/interfaces';

// Models
import { Authentication, User } from '@libs/common/models';

// Seeds
import usersSeed from '@test/seeds/valhalla/1_user';

const seeds: Authentication[] = usersSeed.seeds.map<Authentication>(
  (value: User) => {
    const now: Date = new Date();

    return {
      _id: new Types.ObjectId().toHexString(),
      password: hashSync('password123', SALT_ROUNDS),
      userId: value._id,
      createdAt: now,
      updatedAt: now,
    };
  },
);
const seed: ISeed<Authentication> = {
  name: Authentication.name,
  schema: SchemaFactory.createForClass(Authentication),
  seeds,
};

export default seed;
