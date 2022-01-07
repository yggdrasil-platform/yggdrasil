import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, SuperAgentTest } from 'supertest';

// Enums
import { Routes } from '@libs/common/enums';

describe(__filename, () => {
  let agent: SuperAgentTest;

  beforeAll(() => {
    agent = request(
      `http://localhost:${process.env.EXTERNAL_APP_PORT || 3001}`,
    );
  });

  describe(`GET ${Routes.Health}`, () => {
    it('should connect to all the other services successfully', async () => {
      const response: Response = await agent
        .get(Routes.Health)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchSnapshot();
    });
  });
});
