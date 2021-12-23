import { Module } from '@nestjs/common';

// Providers
import UserService from './service';

// Resolvers
import UserResolver from './resolver';

@Module({
  providers: [UserResolver, UserService],
})
export default class UserModule {}
