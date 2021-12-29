import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

// Controllers
import HealthController from './controller';

// Providers
import HealthService from './service';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule, TerminusModule],
  providers: [HealthService],
})
export default class HealthModule {}
