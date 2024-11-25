import { AppRoutingModule } from './app.routing-module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StatutModule} from './statut/statut.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [AppRoutingModule, PrismaModule , UserModule , StatutModule , TagModule],
})
export class AppModule {}