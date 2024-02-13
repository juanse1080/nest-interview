import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IsUniqueConstraint } from './validators/unique-constraint.validator';
import { ExistConstraint } from './validators/exist-constraint.validator';

@Module({
  controllers: [],
  providers: [PrismaService, IsUniqueConstraint, ExistConstraint],
  exports: [PrismaService],
})
export class PrismaClientModule {}
