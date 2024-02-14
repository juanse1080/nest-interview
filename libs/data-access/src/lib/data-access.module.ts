import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@nest-interview/prisma-client';
import { DataAccessUserService } from './services/user.service';
import { DataAccessRoleService } from './services/role.service';

@Module({
  imports: [PrismaClientModule],
  providers: [DataAccessUserService, DataAccessRoleService],
  exports: [DataAccessUserService, DataAccessRoleService],
})
export class DataAccessModule {}
