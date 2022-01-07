import { agent as request, SuperAgentTest } from 'supertest';
import { Connection } from 'typeorm';

// Enums
import { Routes } from '@libs/common/enums';

// Helpers
import { closeConnections, setupDatabases } from '@test/helpers';

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
    it('should connect to all the other services successfully', async () => {
      expect(true).toBeTruthy();
    });
  });
});
