import { Controller, Get } from '@nestjs/common';
import { TacheService } from './tache.service';

@Controller('tache')
export class TacheController {
    constructor(private readonly tacheService: TacheService) {}

    @Get()
    getTache(): string {
        return this.tacheService.getTache();
    }
}
