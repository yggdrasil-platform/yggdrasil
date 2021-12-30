import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Enums
import { DefaultMessagePatterns, Providers } from '@app/common/enums';

// Interfaces
import { IHealth } from '@app/common/interfaces';

@Injectable()
export default class HealthService {
  constructor(
    @Inject(Providers.AuthClient) private authClient: ClientProxy,
    @Inject(Providers.UserClient) private userClient: ClientProxy,
  ) {}

  async get(): Promise<IHealth[]> {
    return [
      await firstValueFrom(
        this.authClient.send<IHealth, any>(DefaultMessagePatterns.Health, {}),
      ),
      await firstValueFrom(
        this.userClient.send<IHealth, any>(DefaultMessagePatterns.Health, {}),
      ),
    ];
  }
}
