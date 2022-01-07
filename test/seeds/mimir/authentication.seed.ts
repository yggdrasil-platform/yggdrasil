import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Constants
import { SALT_ROUNDS } from '@libs/common/constants';

// Interfaces
import { ISeed } from '@test/interfaces';

// Models
import { Authentication } from '@libs/common/models';

// Seeds
import { usersSeed } from '@test/seeds/valhalla';

const seed: ISeed<Authentication> = {
  entityTarget: Authentication,
  seeds: usersSeed.seeds.map<Authentication>((value) => {
    const now: Date = new Date();

    return {
      id: uuidv4(),
      password: hashSync('password123', SALT_ROUNDS),
      userId: value.id,
      createdAt: now,
      updatedAt: now,
    };
  }),
};

export default seed;
