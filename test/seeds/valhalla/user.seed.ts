import faker from 'faker';

// Interfaces
import { ISeed } from '@test/interfaces';

// Models
import { User } from '@libs/common/models';

const uuids: string[] = [
  'd3b0c969-ad8a-4579-9ded-bbe22b890c23',
  'b7f29129-c32e-4c91-9816-d5178a81b84e',
  '183a7a01-f691-46d6-b97e-79b30d284c46',
  '1036632f-cb93-4e65-8206-82cc1ebbb49f',
  'b595e6fa-be35-487b-b3c8-1bdaa0dfc83f',
  '60d5613e-c8e9-4d5b-b17d-817187322fe0',
  '095fad77-62a5-4090-b678-0bb19be205d6',
  'abeb72e5-0c91-43ed-9f80-e9431af5e5b6',
  '466b5e1d-3a7f-4cea-899a-09935695d195',
  'a70872a0-7f4a-4ec3-a819-ecd830361b32',
];
const seed: ISeed<User> = {
  entityTarget: User,
  seeds: uuids.map<User>((value) => {
    const now: Date = new Date();
    const gender: number = faker.datatype.number(1);
    const firstName: string = faker.name.firstName(gender);
    const lastName: string = faker.name.lastName(gender);

    return {
      id: value,
      firstName,
      lastName,
      username: faker.internet.email(firstName, lastName),
      createdAt: now,
      updatedAt: now,
    };
  }),
};

export default seed;
