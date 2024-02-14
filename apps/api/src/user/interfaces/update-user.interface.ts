import { CreateUserInput } from './create-user.interface';

export interface UpdateUserInput
  extends Omit<Partial<CreateUserInput>, 'email'> {}
