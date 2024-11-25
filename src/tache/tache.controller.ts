import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TacheService } from './tache.service';
import { Tache } from '@prisma/client';

@Controller()
export class TacheController {
    constructor(private readonly tacheService: TacheService) {}

    @Post()
    async createTache(
    @Body() body: { titre: string; description: string; date_echeance: Date; priorite: number; projetId?: number | null; userId?: number | null }
    ) {
        const { titre, description, date_echeance, priorite, projetId, userId } = body;
        return this.tacheService.addTache(titre, description, date_echeance, priorite, projetId, userId);
    }

    @Get()
    async getTaches(): Promise<Tache[]> {
        return this.tacheService.getTaches();
    }
    
    @Put(':id')
    async updateTache(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { titre?: string; description?: string; date_echeance?: Date; priorite?: number; projetId?: number | null, userId?: number | null },
    ): Promise<Tache> {
        return this.tacheService.updateTache(id, body);
    }

    @Delete(':id')
    async deleteTache(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.tacheService.deleteTache(id);
    }

    @Get(':id')
    async getTacheById(@Param('id', ParseIntPipe) id: number): Promise<Tache> {
        return this.tacheService.getTacheById(id);
    }
}
