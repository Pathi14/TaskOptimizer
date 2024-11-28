import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { UserModule } from './user/user.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { StatusModule } from './status/status.module';
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routes),
    UserModule,
    TaskModule,
    ProjectModule,
    StatusModule,
    TagModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}