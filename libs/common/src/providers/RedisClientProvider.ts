import { FactoryProvider, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisClient, { Redis } from 'ioredis';

// Enums
import { Providers } from '../enums';

// Interfaces
import { IRedisEnvironmentVariables } from '../interfaces';

const RedisClientProvider: FactoryProvider<Promise<Redis>> = {
  inject: [ConfigService],
  provide: Providers.RedisClient,
  useFactory: async (
    configService: ConfigService<IRedisEnvironmentVariables, true>,
    logger: LoggerService,
  ): Promise<Redis> => {
    const client: Redis = new RedisClient({
      host: configService.get<string>('REDIS_HOST'),
      password: configService.get<string>('REDIS_PASSWORD'),
      port: configService.get<number>('REDIS_PORT'),
      lazyConnect: true,
    });

    client.on('error', (error) => {
      logger.error(`failed to connect to redis: ${error}`);
    });

    await client.connect();

    return client;
  },
};

export default RedisClientProvider;
