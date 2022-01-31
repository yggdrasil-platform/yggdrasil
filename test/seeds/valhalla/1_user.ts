import { SchemaFactory } from '@nestjs/mongoose';
import faker from 'faker';
import { Types } from 'mongoose';

// Interfaces
import { ISeed } from '@test/interfaces';

// Models
import { User } from '@libs/common/models';

const seeds: User[] = Array.from<unknown, User>({ length: 10 }, () => {
  const now: Date = new Date();
  const gender: number = faker.datatype.number(1);
  const firstName: string = faker.name.firstName(gender);
  const lastName: string = faker.name.lastName(gender);

  return {
    _id: new Types.ObjectId().toHexString(),
    firstName,
    lastName,
    username: faker.internet.email(firstName, lastName),
    createdAt: now,
    updatedAt: now,
  };
});
const seed: ISeed<User> = {
  name: User.name,
  schema: SchemaFactory.createForClass(User),
  seeds,
};

export default seed;
