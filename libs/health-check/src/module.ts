import { Logger, Module } from '@nestjs/common';

// Providers
import HealthCheckService from './service';

// Controllers
import HealthCheckController from './controller';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService, Logger],
})
export default class HealthCheckModule {}
