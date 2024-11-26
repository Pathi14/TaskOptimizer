import { Routes } from '@nestjs/core';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

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
    }
];