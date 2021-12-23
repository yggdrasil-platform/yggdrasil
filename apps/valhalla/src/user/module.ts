import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import UsersController from './controller';

// Models
import { User } from '@app/common/models';

// Providers
import UsersService from './service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export default class UsersModule {}
