import { Module } from '@nestjs/common';
import { DataAccessUserService } from './user.service';
import { PrismaClientModule } from '@nest-interview/prisma-client';

@Module({
  controllers: [],
  providers: [DataAccessUserService],
  exports: [DataAccessUserService],
  imports: [PrismaClientModule],
})
export class DataAccessUsersModule {}
