import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Interfaces
import { IRequest } from '../interfaces';

// Models
import { User } from '@libs/common/models';

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext<{ req: IRequest }>().req.user;
  },
);

export default CurrentUser;
