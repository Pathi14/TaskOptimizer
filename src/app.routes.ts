import { Routes } from '@nestjs/core';
import { TacheModule } from './tache/tache.module';
import { ProjetModule } from './projet/projet.module';

export const routes: Routes = [
    {
        path: 'tache',
        module: TacheModule,
    },
    {
        path: 'projet', 
        module: ProjetModule,
    }
];