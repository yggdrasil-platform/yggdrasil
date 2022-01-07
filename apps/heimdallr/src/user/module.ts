import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Providers
import { AuthClientProvider, UserClientProvider } from '@libs/common/providers';
import AuthenticationsService from '../auth/service';
import UsersService from './service';

// Resolvers
import UsersResolver from './resolver';

// Strategies
import { JwtStrategy } from '../common/strategies';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthClientProvider,
    AuthenticationsService,
    JwtStrategy,
    UserClientProvider,
    UsersResolver,
    UsersService,
  ],
})
export default class UsersModule {}
