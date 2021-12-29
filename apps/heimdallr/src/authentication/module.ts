import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Providers
import { AuthClientProvider, UserClientProvider } from '@app/common/providers';
import AuthenticationsService from './service';
import { UsersService } from '../user';

// Resolvers
import AuthenticationsResolver from './resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthClientProvider,
    AuthenticationsResolver,
    AuthenticationsService,
    UsersService,
    UserClientProvider,
  ],
})
export default class UsersModule {}
