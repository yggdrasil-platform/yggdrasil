import { HttpStatus, HttpException } from '@nestjs/common';

interface ITcpResponseErrorBody {
  response: string | Record<string, any>;
  status: number;
}

export default ITcpResponseErrorBody;
