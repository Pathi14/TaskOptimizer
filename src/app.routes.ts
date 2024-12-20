import { Routes } from '@nestjs/core';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { TagModule } from './tag/tag.module';
import { ProjectModule } from './project/project.module';

export const routes: Routes = [
    {
        path: 'tasks',
        module: TaskModule,
    },
    {
        path: 'projects', 
        module: ProjectModule,
    },
    {
        path: 'users',
        module: UserModule,
    },
    {
        path: 'status',
        module: StatusModule
    },
    {
        path: 'tags',
        module: TagModule,
    }
];