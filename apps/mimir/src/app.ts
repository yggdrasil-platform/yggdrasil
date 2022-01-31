import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import * as Joi from 'joi';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Modules
import { HealthModule } from '@libs/health';
import { AuthenticationsModule } from './authentication';
import { SessionsModule } from './session';

@Module({
  imports: [
    AuthenticationsModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object<IEnvironmentVariables, true>({
        APP_NAME: Joi.string().default('mimir'),
        AUTH_APP_HOST: Joi.string().required(),
        AUTH_APP_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_NAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_USER: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        LOG_LEVEL: Joi.string()
          .default('error')
          .valid('debug', 'error', 'info', 'silent', 'warn'),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        REDIS_HOST: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),
        USER_APP_HOST: Joi.string().required(),
        USER_APP_PORT: Joi.number().required(),
        VERSION: Joi.string().required(),
      }),
    }),
    HealthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IEnvironmentVariables, true>,
      ): MongooseModuleOptions => ({
        appName: configService.get<string>('APP_NAME'),
        authSource: 'admin',
        connectionName: configService.get<string>('APP_NAME'),
        dbName: configService.get<string>('MONGO_NAME'),
        pass: configService.get<string>('MONGO_PASSWORD'),
        uri: `mongodb://${configService.get<string>(
          'MONGO_HOST',
        )}:${configService.get<string>('MONGO_PORT')}`,
        user: configService.get<string>('MONGO_USER'),
      }),
    }),
    SessionsModule,
    TerminusModule,
  ],
})
export default class AppModule {}
