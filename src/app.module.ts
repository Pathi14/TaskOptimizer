import { AppRoutingModule } from './app.routing-module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
    imports: [AppRoutingModule, PrismaModule],
})
export class AppModule {}