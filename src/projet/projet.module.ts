import { Module } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { ProjetController } from './projet.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProjetService],
  controllers: [ProjetController],
  exports: [ProjetService],
})
export class ProjetModule {}
