import faker from 'faker';
import { agent as request, Response, SuperAgentTest } from 'supertest';
import { Connection, getRepository, Repository } from 'typeorm';

// Enums
import { Routes } from '@libs/common/enums';

// Inputs
import { RegisterInput } from '@apps/heimdallr/src/user/inputs';

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
  setupDatabases,
  testGqlAuthorization,
} from '@test/utils';

describe(__filename, () => {
  let agent: SuperAgentTest;
  let connections: Connection[] = [];
  let registerInput: RegisterInput = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'password123',
    username: faker.internet.email(),
  };
  let authenticationRepository: Repository<Authentication>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    agent = request(
      `http://localhost:${process.env.EXTERNAL_APP_PORT || 3001}`,
    );
  });

  beforeEach(async () => {
    connections = await setupDatabases();
    authenticationRepository = getRepository(Authentication, 'mimir');
    userRepository = getRepository(User, 'valhalla');
  });

  afterEach(async () => {
    await closeConnections(connections);
  });

  describe(`${Routes.GraphQL}#register()`, () => {
    it('should create a new user', async () => {
      const response: Response = await agent
        .post(Routes.GraphQL)
        .send({
          query: register,
          variables: {
            input: registerInput,
          },
        })
        .expect(200);
      let authentication: Authentication | undefined;
      let userId: string | undefined;
      let user: User | undefined;

      expect(response.body.data?.register?.accessToken).toBeDefined();

      userId = getUserIdFromJwt(response.body.data.register.accessToken);
      authentication = await authenticationRepository.findOne({
        where: {
          userId,
        },
      });
      user = await userRepository.findOne({
        where: {
          id: userId,
        },
      });

      expect(authentication).toBeDefined();
      expect(user).toBeDefined();
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
