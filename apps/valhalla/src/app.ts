import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('valhalla'),
        LOG_LEVEL: Joi.string(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        VERSION: Joi.string().required(),
        USER_SERVICE_HOST: Joi.string().required(),
        USER_SERVICE_PORT: Joi.number().required(),
      }),
    }),
    HealthModule,
    Logger,
    UsersModule,
  ],
})
export default class AppModule {}
