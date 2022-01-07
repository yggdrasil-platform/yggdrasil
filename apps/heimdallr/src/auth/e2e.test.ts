import { HttpStatus } from '@nestjs/common';
import faker from 'faker';
import { agent as request, SuperAgentTest } from 'supertest';
import { Connection } from 'typeorm';

// Enums
import { Routes } from '@libs/common/enums';

// Models
import { User } from '@libs/common/models';

// Seeds
import { usersSeed } from '@test/seeds';

// Utils
import { closeConnections, setupDatabases } from '@test/utils';

describe(__filename, () => {
  let agent: SuperAgentTest;
  let connections: Connection[] = [];

  beforeAll(async () => {
    agent = request(
      `http://localhost:${process.env.EXTERNAL_APP_PORT || 3001}`,
    );
  });

  beforeEach(async () => {
    connections = await setupDatabases();
  });

  afterEach(async () => {
    await closeConnections(connections);
  });

  describe(`POST ${Routes.Login}`, () => {
    it(`should return ${HttpStatus.UNAUTHORIZED} if the user does not exist`, async () => {
      await agent
        .post(Routes.Login)
        .send({
          password: 'password',
          username: faker.internet.email(),
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it(`should return ${HttpStatus.UNAUTHORIZED} if the user password is incorrect`, async () => {
      const user: User | undefined = usersSeed.seeds.shift();

      await agent
        .post(Routes.Login)
        .send({
          password: 'unknown',
          username: user?.username,
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it(`should return ${HttpStatus.CREATED} if the user password is correct`, async () => {
      const user: User | undefined = usersSeed.seeds.shift();

      await agent
        .post(Routes.Login)
        .send({
          password: 'password123',
          username: user?.username,
        })
        .expect(HttpStatus.CREATED);
    });
  });
});
