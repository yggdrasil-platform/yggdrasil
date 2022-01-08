import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Interfaces
import { IEnvironmentVariables } from './common/interfaces';

// Modules
import { ViewModule } from './view';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object<IEnvironmentVariables, true>({
        APP_NAME: Joi.string().default('midgard'),
        LOG_LEVEL: Joi.string()
          .default('error')
          .valid('debug', 'error', 'info', 'silent', 'warn'),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(8080),
        VERSION: Joi.string().required(),
      }),
    }),
    ViewModule,
  ],
})
export default class AppModule {}
