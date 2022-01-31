import { HttpStatus } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import faker from 'faker';
import { Model } from 'mongoose';
import { agent as request, Response, SuperAgentTest } from 'supertest';

// Enums
import { Routes } from '@libs/common/enums';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';
import { IMongoConnection } from '@test/interfaces';

// Models
import { User } from '@libs/common/models';

// Utils
import { closeConnections, createConnections } from '@test/utils';

describe(__filename, () => {
  let agent: SuperAgentTest;
  let connections: IMongoConnection[] = [];
  let userModel: Model<IDocumentModel<User>>;

  beforeAll(async () => {
    agent = request(
      `http://localhost:${process.env.EXTERNAL_APP_PORT || 3001}`,
    );
  });

  beforeEach(async () => {
    let valhallaConnection: IMongoConnection | undefined;

    connections = await createConnections(['mimir', 'valhalla'], {
      seed: true,
    });
    valhallaConnection = connections.find(
      (value) => value.database === 'valhalla',
    );

    if (valhallaConnection) {
      userModel = valhallaConnection.connection.model(User.name);
    }
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
      const userDoc: IDocumentModel<User> | null = await userModel.findOne({});

      await agent
        .post(Routes.Login)
        .send({
          password: 'unknown',
          username: userDoc?.username,
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it(`should return ${HttpStatus.CREATED} if the user password is correct`, async () => {
      const userDoc: IDocumentModel<User> | null = await userModel.findOne({});
      const response: Response = await agent
        .post(Routes.Login)
        .send({
          password: 'password123',
          username: userDoc?.username,
        })
        .expect(HttpStatus.CREATED);

      expect(response.body?.accessToken).toBeDefined();
    });
  });
});
