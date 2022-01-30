import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import * as Joi from 'joi';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Modules
import { HealthModule } from '@libs/health';
import { UsersModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object<IEnvironmentVariables, true>({
        APP_NAME: Joi.string().default('valhalla'),
        AUTH_APP_HOST: Joi.string().required(),
        AUTH_APP_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().default(27017),
        DB_USER: Joi.string().required(),
        LOG_LEVEL: Joi.string()
          .default('error')
          .valid('debug', 'error', 'info', 'silent', 'warn'),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
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
        authSource: 'admin',
        connectionName: configService.get<string>('APP_NAME'),
        dbName: configService.get<string>('DB_NAME'),
        pass: configService.get<string>('DB_PASSWORD'),
        uri: `mongodb://${configService.get<string>(
          'DB_HOST',
        )}:${configService.get<string>('DB_PORT')}`,
        user: configService.get<string>('DB_USER'),
      }),
    }),
    TerminusModule,
    UsersModule,
  ],
})
export default class AppModule {}
