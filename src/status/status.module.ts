import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatutController } from './status.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  controllers: [StatutController],
  providers: [StatusService, PrismaService],
})
export class StatusModule {}