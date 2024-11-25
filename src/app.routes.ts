import { Routes } from '@nestjs/core';
import { TacheModule } from './tache/tache.module';

export const routes: Routes = [
    {
        path: 'tache',
        module: TacheModule,
    }
];