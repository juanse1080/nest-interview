import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserInput } from '../interfaces/update-user.interface';

export class UpdateUserDto
  extends OmitType(PartialType(CreateUserDto), ['email'])
  implements UpdateUserInput {}
