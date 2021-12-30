import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Providers
import { AuthClientProvider, UserClientProvider } from '@app/common/providers';
import AuthenticationsService from '../auth/service';
import UsersService from './service';

// Resolvers
import UsersResolver from './resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthClientProvider,
    AuthenticationsService,
    UserClientProvider,
    UsersResolver,
    UsersService,
  ],
})
export default class UsersModule {}
