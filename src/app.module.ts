import { AppRoutingModule } from './app.routing-module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [AppRoutingModule, PrismaModule , UserModule],
})
export class AppModule {}