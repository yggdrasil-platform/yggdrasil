import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import HealthCheckController from './controller';

// Providers
import HealthCheckService from './service';

@Module({
  controllers: [HealthCheckController],
  imports: [ConfigModule],
  providers: [HealthCheckService],
})
export default class HealthCheckModule {}
