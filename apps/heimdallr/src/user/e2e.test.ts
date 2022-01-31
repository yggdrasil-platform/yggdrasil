import { SchemaFactory } from '@nestjs/mongoose';
import faker from 'faker';
import { agent as request, Response, SuperAgentTest } from 'supertest';
import { Model } from 'mongoose';

// Enums
import { Routes } from '@libs/common/enums';

// Inputs
import { RegisterInput } from '@apps/heimdallr/src/user/inputs';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';
import { IMongoConnection } from '@test/interfaces';

// Models
import { Authentication, User } from '@libs/common/models';

// Mutations
import { register } from '@test/mutations';

// Mutations
import { me } from '@test/queries';

// Utils
import {
  closeConnections,
  getUserIdFromJwt,
  createConnections,
  testGqlAuthorization,
} from '@test/utils';

describe(__filename, () => {
  let agent: SuperAgentTest;
  let connections: IMongoConnection[] = [];
  let registerInput: RegisterInput = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'password123',
    username: faker.internet.email(),
  };
  let authenticationModel: Model<IDocumentModel<Authentication>>;
  let userModel: Model<IDocumentModel<User>>;

  beforeAll(async () => {
    agent = request(
      `http://localhost:${process.env.EXTERNAL_APP_PORT || 3001}`,
    );
  });

  beforeEach(async () => {
    let mimirConnection: IMongoConnection | undefined;
    let valhallaConnection: IMongoConnection | undefined;

    connections = await createConnections(['mimir', 'valhalla']);
    mimirConnection = connections.find((value) => value.database === 'mimir');
    valhallaConnection = connections.find(
      (value) => value.database === 'valhalla',
    );

    if (mimirConnection) {
      authenticationModel = mimirConnection.connection.model(
        Authentication.name,
        SchemaFactory.createForClass(Authentication),
      );
    }

    if (valhallaConnection) {
      userModel = valhallaConnection.connection.model(
        User.name,
        SchemaFactory.createForClass(User),
      );
    }
  });

  afterEach(async () => {
    await closeConnections(connections);
  });

  describe(`${Routes.GraphQL}#register()`, () => {
    it('should create a new user', async () => {
      // Act
      const response: Response = await agent
        .post(Routes.GraphQL)
        .send({
          query: register,
          variables: {
            input: registerInput,
          },
        })
        .expect(200);
      let authenticationDoc: IDocumentModel<Authentication> | null;
      let userDoc: IDocumentModel<User> | null;
      let userId: string | undefined;

      // Assert
      expect(response.body.data?.register?.accessToken).toBeDefined();

      userId = getUserIdFromJwt(response.body.data.register.accessToken);
      authenticationDoc = await authenticationModel.findOne({
        userId,
      });
      userDoc = await userModel.findById(userId);

      expect(authenticationDoc).not.toBeNull();
      expect(userDoc).not.toBeNull();
    });
  });

  describe(`${Routes.GraphQL}#me()`, () => {
    it.each([
      ['no authorization header exists', undefined],
      ['no authorization header is not a bearer', 'Basic 123456'],
      ['no authorization header is missing a token', 'Bearer'],
    ])('should fail with if %s', async (name, authHeader) =>
      testGqlAuthorization(agent, me, undefined, authHeader),
    );
  });
});
