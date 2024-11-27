import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { TagController } from './tag.controller';
@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService],
  exports: [TagService],
})
export class TagModule {}