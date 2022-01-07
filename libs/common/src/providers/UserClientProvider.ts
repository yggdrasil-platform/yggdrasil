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
import { IApplicationsEnvironmentVariables } from '../interfaces';

const UserClientProvider: FactoryProvider<ClientProxy> = {
  inject: [ConfigService],
  provide: Providers.UserClient,
  useFactory: (
    configService: ConfigService<IApplicationsEnvironmentVariables, true>,
  ) =>
    ClientProxyFactory.create({
      options: {
        host: configService.get<string>('USER_APP_HOST'),
        port: configService.get<number>('USER_APP_PORT'),
      },
      transport: Transport.TCP,
    }),
};

export default UserClientProvider;
