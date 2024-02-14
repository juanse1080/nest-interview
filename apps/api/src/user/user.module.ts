import { Module } from '@nestjs/common';
import { DataAccessModule } from '@nest-interview/data-access';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DataAccessModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
