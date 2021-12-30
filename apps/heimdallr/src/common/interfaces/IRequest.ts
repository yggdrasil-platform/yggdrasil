import { Request } from 'express';

// Models
import { User } from '@app/common/models';

interface IRequest extends Request {
  user?: User;
}

export default IRequest;
