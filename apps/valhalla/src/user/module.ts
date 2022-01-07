import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import UsersController from './controller';

// Models
import { User } from '@libs/common/models';

// Providers
import UsersService from './service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Logger, UsersService],
})
export default class UsersModule {}
