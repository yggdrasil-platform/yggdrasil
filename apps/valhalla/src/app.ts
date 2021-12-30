import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Models
import { User } from '@app/common/models';

// Modules
import { HealthModule } from '@app/health';
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
        AUTH_SERVICE_HOST: Joi.string().required(),
        AUTH_SERVICE_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        LOG_LEVEL: Joi.string(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        USER_SERVICE_HOST: Joi.string().required(),
        USER_SERVICE_PORT: Joi.number().required(),
        VERSION: Joi.string().required(),
      }),
    }),
    HealthModule,
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
        entities: [User],
        synchronize: true, // TODO: remove from production
      }),
    }),
    UsersModule,
  ],
})
export default class AppModule {}
