import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import HealthController from './controller';

// Providers
import HealthService from './service';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule],
  providers: [HealthService],
})
export default class HealthModule {}
