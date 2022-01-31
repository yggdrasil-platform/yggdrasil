import { Module, Logger } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

// Controllers
import UsersController from './controller';

// Models
import { User } from '@libs/common/models';

// Providers
import UsersService from './service';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: SchemaFactory.createForClass(User) },
    ]),
  ],
  providers: [Logger, UsersService],
})
export default class UsersModule {}
