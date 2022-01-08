import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import ViewController from './controller';

// Providers
import ViewService from './service';

@Module({
  controllers: [ViewController],
  imports: [ConfigModule],
  providers: [ViewService],
})
export default class ViewModule {}
