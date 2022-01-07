import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import HealthController from './controller';

// Providers
import { AuthClientProvider, UserClientProvider } from '@libs/common/providers';
import HealthService from './service';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule],
  providers: [AuthClientProvider, HealthService, UserClientProvider],
})
export default class HealthModule {}
