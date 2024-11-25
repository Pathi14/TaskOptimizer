import { Module } from '@nestjs/common';
import { TacheController } from './tache.controller';
import { TacheService } from './tache.service';

@Module({
  controllers: [TacheController],
  providers: [TacheService]
})
export class TacheModule {}
