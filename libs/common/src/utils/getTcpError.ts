import { HttpException } from '@nestjs/common';

// Interfaces
import { ITcpResponseErrorBody } from '../interfaces';

/**
 * Convenience function to convert a NestJS HttpException to an error for transport between TCP services. When this
 * arrives at the other destination, it can be reverted back to a HttpException easily by using:
 * @example
 * const exception: HttpException = new HttpException(error.response, error.status);
 * @param {HttpException} exception an initialised HttpException
 * @returns {ITcpResponseErrorBody} a TCP error body ready to be transported
 */
export default function getTcpError(
  exception: HttpException,
): ITcpResponseErrorBody {
  return {
    response: exception.getResponse(),
    status: exception.getStatus(),
  };
}
