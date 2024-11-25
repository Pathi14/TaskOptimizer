import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TacheModule } from './tache/tache.module';

@Module({
  imports: [TacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
