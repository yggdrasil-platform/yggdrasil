import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(ctx: ExecutionContext): Request {
    const context: GqlExecutionContext = GqlExecutionContext.create(ctx);

    return context.getContext().req;
  }
}
