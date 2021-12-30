import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Models
import { Authentication } from '@app/common/models';

// Modules
import { HealthModule } from '@app/health';
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
        AUTH_SERVICE_HOST: Joi.string().required(),
        AUTH_SERVICE_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        LOG_LEVEL: Joi.string(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        REDIS_HOST: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),
        USER_SERVICE_HOST: Joi.string().required(),
        USER_SERVICE_PORT: Joi.number().required(),
        VERSION: Joi.string().required(),
      }),
    }),
    HealthModule,
    SessionsModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IEnvironmentVariables, true>,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Authentication],
        synchronize: true, // TODO: remove from production
      }),
    }),
  ],
})
export default class AppModule {}
