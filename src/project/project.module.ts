import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjetController } from './project.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProjectService],
  controllers: [ProjetController],
  exports: [ProjectService],
})
export class ProjectModule {}
