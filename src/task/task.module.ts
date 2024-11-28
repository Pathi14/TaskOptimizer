import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService, EmailService],
  exports: [TaskService],
})
export class TaskModule {}
