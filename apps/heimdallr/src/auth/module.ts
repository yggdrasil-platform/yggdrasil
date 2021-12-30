import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Providers
import { AuthClientProvider, UserClientProvider } from '@app/common/providers';
import AuthService from './service';
import UsersService from '../user/service';

// Resolvers
import AuthResolver from './resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthClientProvider,
    AuthResolver,
    AuthService,
    UserClientProvider,
    UsersService,
  ],
})
export default class AuthModule {}
