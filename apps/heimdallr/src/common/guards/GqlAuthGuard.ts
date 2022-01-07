import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// Interfaces
import { IRequest } from '../interfaces';

@Injectable()
export default class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest(ctx: ExecutionContext): IRequest {
    const context: GqlExecutionContext = GqlExecutionContext.create(ctx);

    return context.getContext<{ req: IRequest }>().req;
  }
}
