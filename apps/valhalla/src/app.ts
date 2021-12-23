import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Modules
import { HealthCheckModule } from '@app/health-check';

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
        PORT: Joi.number().default(3001),
        VERSION: Joi.string().required(),
      }),
    }),
    HealthCheckModule,
    Logger,
  ],
})
export default class AppModule {}
