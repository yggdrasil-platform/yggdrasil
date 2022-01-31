import { Response, SuperAgentTest, Test } from 'supertest';

// Enums
import { Routes } from '@libs/common/enums';

// Utils
import { isUnauthorizedError } from '@test/utils';

/**
 * Convenience function to test that a GraphQL query returns an unauthorized error.
 * @param {SuperAgentTest} request - an instance of a supertest.
 * @param {string} query - a GraphQL query/mutation literal.
 * @param {Record<string, unknown>} variables [optional] - any variables to pass to the GraphQL query/mutation.
 * @param {string} authHeader [optional] - an authorization header value.
 */
export default async function testGqlAuthorization(
  request: SuperAgentTest,
  query: string,
  variables?: Record<string, unknown>,
  authHeader?: string,
): Promise<void> {
  const test: Test = request
    .post(Routes.GraphQL)
    .send({
      query,
      variables,
    })
    .expect(200);

  if (authHeader) {
    test.set('Authorization', authHeader);
  }

  const response: Response = await test;

  expect(isUnauthorizedError(response)).toBe(true);
}
