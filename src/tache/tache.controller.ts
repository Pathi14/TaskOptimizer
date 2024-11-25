import { Body, Controller, Get, Post } from '@nestjs/common';
import { TacheService } from './tache.service';

@Controller()
export class TacheController {
    constructor(private readonly tacheService: TacheService) {}

    @Post()
    async createTask(
    @Body() body: { titre: string; description: string; date_echeance: Date; priorité: number; }
    ) {
        const { titre, description, date_echeance, priorité } = body;
        return this.tacheService.addTache(titre, description, date_echeance, priorité);
    }


    @Get()
    getTache(): string {
        return this.tacheService.getTache();
    }
}
