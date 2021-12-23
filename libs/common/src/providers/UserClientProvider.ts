import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

// Enums
import { Providers } from '../enums';

// Interfaces
import { IEnvironmentVariables } from '../interfaces';

const UserClientProvider: FactoryProvider<ClientProxy> = {
  inject: [ConfigService],
  provide: Providers.User,
  useFactory: (configService: ConfigService<IEnvironmentVariables, true>) =>
    ClientProxyFactory.create({
      options: {
        host: configService.get<string>('USER_SERVICE_HOST'),
        port: configService.get<number>('USER_SERVICE_PORT'),
      },
      transport: Transport.TCP,
    }),
};

export default UserClientProvider;
