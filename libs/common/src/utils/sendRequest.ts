import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { ITcpResponse } from '@app/common';

export default async function sendRequest<TPayload, TResult>(
  client: ClientProxy,
  pattern: string,
  payload: TPayload,
): Promise<TResult> {
  const [error, value] = await firstValueFrom(
    client.send<ITcpResponse<TResult>, TPayload>(pattern, payload),
  );

  if (error) {
    if (error.response && error.status) {
      throw new HttpException(error.response, error.status);
    }

    throw new InternalServerErrorException('unknown error');
  }

  return value;
}
