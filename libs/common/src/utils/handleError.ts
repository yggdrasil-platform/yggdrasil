import { HttpException, InternalServerErrorException } from '@nestjs/common';

export default function handleError(exception: any): HttpException {
  if (exception.response && exception.status) {
    return new HttpException(exception.response, exception.status);
  }

  return new InternalServerErrorException('unknown error');
}
