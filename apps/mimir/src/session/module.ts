import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import SessionsController from './controller';

// Interfaces
import { IEnvironmentVariables } from '../common/interfaces';

// Providers
import { RedisClientProvider } from '@libs/common/providers';
import SessionsService from './service';

@Module({
  controllers: [SessionsController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<IEnvironmentVariables, true>,
      ) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Logger, RedisClientProvider, SessionsService],
})
export default class SessionsModule {}
