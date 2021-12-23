import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Providers
import { UserClientProvider } from '@app/common/providers';
import UsersService from './service';

// Resolvers
import UsersResolver from './resolver';

@Module({
  imports: [ConfigModule],
  providers: [UserClientProvider, UsersResolver, UsersService],
})
export default class UsersModule {}
