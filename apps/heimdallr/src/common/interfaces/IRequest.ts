import { Request } from 'express';

// Models
import { User } from '@libs/common/models';

interface IRequest extends Request {
  user?: User;
}

export default IRequest;
