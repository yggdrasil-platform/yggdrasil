import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Modules
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { UsersModule } from './user';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object<IEnvironmentVariables, true>({
        APP_NAME: Joi.string().default('heimdallr'),
        AUTH_APP_HOST: Joi.string().required(),
        AUTH_APP_PORT: Joi.number().required(),
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
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IEnvironmentVariables, true>,
      ): GqlModuleOptions => ({
        autoSchemaFile:
          configService.get<string>('NODE_ENV') === 'test'
            ? true
            : join(__dirname, 'schema.gql'),
        context: ({ req, res }) => ({ req, res }),
        sortSchema: true,
      }),
    }),
    HealthModule,
    UsersModule,
  ],
})
export default class AppModule {}
