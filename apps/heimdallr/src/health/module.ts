import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import HealthController from './controller';

// Providers
import { UserClientProvider } from '@app/common/providers';
import HealthService from './service';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule],
  providers: [HealthService, UserClientProvider],
})
export default class HealthModule {}
