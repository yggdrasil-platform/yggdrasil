import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Configs
import ormConfig from '../ormconfig';

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
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
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
    SessionsModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IEnvironmentVariables, true>,
      ): TypeOrmModuleOptions => ({
        ...ormConfig,
        database: configService.get<string>('DB_NAME'),
        host: configService.get<string>('DB_HOST'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
      }),
    }),
  ],
})
export default class AppModule {}
