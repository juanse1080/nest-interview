import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaClientModule } from '@nest-interview/prisma-client';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaClientModule],
})
export class DataAccessUsersModule {}
