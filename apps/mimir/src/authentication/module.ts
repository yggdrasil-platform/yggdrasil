import { Logger, Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

// Controllers
import AuthenticationsController from './controller';

// Models
import { Authentication } from '@libs/common/models';

// Providers
import AuthenticationsService from './service';

@Module({
  controllers: [AuthenticationsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Authentication.name,
        schema: SchemaFactory.createForClass(Authentication),
      },
    ]),
  ],
  providers: [AuthenticationsService, Logger],
})
export default class AuthenticationsModule {}
