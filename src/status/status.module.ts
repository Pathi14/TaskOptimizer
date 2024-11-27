import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatutController } from './status.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StatutController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}