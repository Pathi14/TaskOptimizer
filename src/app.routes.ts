import { Routes } from '@nestjs/core';
import { TaskModule } from './task/task.module';
// import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';

export const routes: Routes = [
    {
        path: 'tasks',
        module: TaskModule,
    },
    // {
    //     path: 'projects', 
    //     module: ProjectModule,
    // },
    {
        path: 'users',
        module: UserModule,
    },
    {
        path: 'status',
        module: StatusModule
    }
];