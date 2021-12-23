import { Field, ObjectType } from '@nestjs/graphql';

// Interfaces
import { IUser } from '@app/common/interfaces';

@ObjectType()
export default class User implements IUser {
  @Field({
    description: `The user's first name`,
  })
  firstName: string;

  @Field({
    description: `The user's last name`,
  })
  lastName: string;
}
