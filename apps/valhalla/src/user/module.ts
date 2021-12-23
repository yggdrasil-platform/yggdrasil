import { Module } from '@nestjs/common';

// Controllers
import UsersController from './controller';

// Providers
import UsersService from './service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export default class UsersModule {}
