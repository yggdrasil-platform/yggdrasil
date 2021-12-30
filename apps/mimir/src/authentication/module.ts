import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import AuthenticationsController from './controller';

// Models
import { Authentication } from '@app/common/models';

// Providers
import AuthenticationsService from './service';

@Module({
  controllers: [AuthenticationsController],
  imports: [TypeOrmModule.forFeature([Authentication])],
  providers: [AuthenticationsService, Logger],
})
export default class AuthenticationsModule {}
