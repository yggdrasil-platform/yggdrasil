import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Interfaces
import { IUserServiceEnvironmentVariables } from './common/interfaces';

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
      validationSchema: Joi.object<IUserServiceEnvironmentVariables, true>({
        APP_NAME: Joi.string().default('valhalla'),
        LOG_LEVEL: Joi.string(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        VERSION: Joi.string().required(),
        USER_SERVICE_DB_HOST: Joi.string().required(),
        USER_SERVICE_DB_NAME: Joi.string().required(),
        USER_SERVICE_DB_PASSWORD: Joi.string().required(),
        USER_SERVICE_DB_PORT: Joi.number().default(5432),
        USER_SERVICE_DB_USER: Joi.string().required(),
        USER_SERVICE_HOST: Joi.string().required(),
        USER_SERVICE_PORT: Joi.number().required(),
      }),
    }),
    HealthModule,
    Logger,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IUserServiceEnvironmentVariables, true>
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('USER_SERVICE_DB_HOST'),
        port: configService.get<number>('USER_SERVICE_DB_PORT'),
        username: configService.get<string>('USER_SERVICE_DB_USER'),
        password: configService.get<string>('USER_SERVICE_DB_PASSWORD'),
        database: configService.get<string>('USER_SERVICE_DB_NAME'),
        entities: [User],
        synchronize: true, // TODO: remove from production
      }),
    }),
    UsersModule,
  ],
})
export default class AppModule {}
