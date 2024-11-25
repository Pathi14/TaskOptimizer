import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TacheModule } from './tache/tache.module';

@Module({
    exports: [RouterModule],
    imports: [RouterModule.register(routes), TacheModule],
})
export class AppRoutingModule {}