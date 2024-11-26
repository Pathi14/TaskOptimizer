import { Module } from '@nestjs/common';
import { StatutService } from './statut.service';
import { StatutController } from './statut.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  controllers: [StatutController],
  providers: [StatutService, PrismaService],
})
export class StatutModule {}