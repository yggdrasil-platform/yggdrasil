import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';

// Interfaces
import { IEnvironmentVariables } from '@app/common/interfaces';

// Modules
import { HealthCheckModule } from '@app/health-check';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('heimdallr'),
        LOG_LEVEL: Joi.string(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        VERSION: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<IEnvironmentVariables, true>
      ): GqlModuleOptions => ({
        autoSchemaFile:
          configService.get<string>('NODE_ENV') === 'test'
            ? true
            : join(__dirname, 'schema.gql'),
        context: ({ req, res }) => ({ req, res }),
        sortSchema: true,
      }),
    }),
    HealthCheckModule,
    Logger,
    UserModule,
  ],
})
export default class AppModule {}
