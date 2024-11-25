import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TacheModule } from './tache/tache.module';
import { ProjetModule } from './projet/projet.module';

@Module({
    exports: [RouterModule],
    imports: [RouterModule.register(routes), TacheModule, ProjetModule],
})
export class AppRoutingModule {}