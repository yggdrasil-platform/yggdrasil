import { HttpException } from '@nestjs/common';

type ITcpResponse<TData> = [any | null, TData];

export default ITcpResponse;
