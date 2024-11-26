import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';

@Module({
    exports: [RouterModule],
    imports: [RouterModule.register(routes), TaskModule, ProjectModule, UserModule, StatusModule],
})
export class AppRoutingModule {}