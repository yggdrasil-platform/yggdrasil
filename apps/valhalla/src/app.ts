import { Logger, Module } from '@nestjs/common';

// Modules
import { HealthCheckModule } from '@app/health-check';

@Module({
  imports: [HealthCheckModule, Logger],
})
export default class AppModule {}
