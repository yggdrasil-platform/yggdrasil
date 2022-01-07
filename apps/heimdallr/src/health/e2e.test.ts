import { agent as request, Response, SuperAgentTest } from 'supertest';

// Enums
import { Routes } from '@app/common/enums';

describe(Routes.Health, () => {
  let agent: SuperAgentTest;

  beforeAll(() => {
    agent = request(`http://localhost:${process.env.EXTERNAL_PORT || 3001}`);
  });

  it('should connect to all the other services successfully', async () => {
    const response: Response = await agent.get(Routes.Health).expect(200);

    expect(response.body).toMatchSnapshot();
  });
});
