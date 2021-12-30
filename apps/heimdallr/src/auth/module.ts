import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthController from './controller';

// Providers
import { AuthClientProvider, UserClientProvider } from '@app/common/providers';
import AuthService from './service';
import UsersService from '../user/service';

// Strategies
import { LocalStrategy } from '../common/strategies';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule],
  providers: [
    AuthClientProvider,
    AuthService,
    LocalStrategy,
    UserClientProvider,
    UsersService,
  ],
})
export default class AuthModule {}
