import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis, { Redis } from 'ioredis';

// Enums
import { Providers } from '../enums';

// Interfaces
import { IRedisEnvironmentVariables } from '../interfaces';

const RedisClientProvider: FactoryProvider<Redis> = {
  inject: [ConfigService],
  provide: Providers.RedisClient,
  useFactory: (
    configService: ConfigService<IRedisEnvironmentVariables, true>,
  ) =>
    new IORedis({
      host: configService.get<string>('REDIS_HOST'),
      password: configService.get<string>('REDIS_PASSWORD'),
      port: configService.get<number>('REDIS_PORT'),
    }),
};

export default RedisClientProvider;
