import { AppRoutingModule } from './app.routing-module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProjetModule } from './projet/projet.module';

@Module({
    imports: [AppRoutingModule, PrismaModule],
})
export class AppModule {}