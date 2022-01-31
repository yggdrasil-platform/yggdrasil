import { HttpStatus } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { Response } from 'supertest';

/**
 * Convenience function to check if the Apollo errors contain an unauthorized error.
 * @param {Response} response - a SuperTest response to check.
 * @returns {boolean} - `true` if an unauthorized error is present, `false` otherwise.
 */
export default function isUnauthorizedError(response: Response): boolean {
  return (
    !!response.body.errors &&
    !!response.body.errors.find(
      (value: ApolloError) =>
        value.extensions.response &&
        value.extensions.response.statusCode === HttpStatus.UNAUTHORIZED,
    )
  );
}
