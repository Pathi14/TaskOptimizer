import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { StatutModule } from './statut/statut.module';
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, StatutModule, TagModule , TaskModule, ProjectModule
  ],
  providers: [PrismaService],
})
export class AppModule {}