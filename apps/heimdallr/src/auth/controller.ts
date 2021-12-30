import {
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

// Enums
import { Routes } from '@app/common/enums';

// Guards
import { LocalAuthGuard } from '../common/guards';

// Interfaces
import { IRequest } from '../common/interfaces';

// Models
import { Session } from '@app/common/models';

// Providers
import AuthService from './service';

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(Routes.Login)
  public async login(@Request() req: IRequest): Promise<Session> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return await this.authService.createSession(req.user.id);
  }
}
