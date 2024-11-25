import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { Projet } from '@prisma/client';

@Controller()
export class ProjetController {

    constructor(private readonly projetService: ProjetService) {}

    @Post()
    async createProjet(
    @Body() body: { titre: string; description: string }
    ) {
        const { titre, description } = body;
        return this.projetService.addProjet(titre, description);
    }

    @Get()
    async getProjets(): Promise<Projet[]> {
        return this.projetService.getProjets();
    }
    
    @Put(':id')
    async updateProjet(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { titre?: string; description?: string },
    ): Promise<Projet> {
        return this.projetService.updateProjet(id, body);
    }

    @Delete(':id')
    async deleteProjet(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.projetService.deleteProjet(id);
    }

    @Get(':id')
    async getProjetbyId(@Param('id', ParseIntPipe) id: number): Promise<Projet> {
        return this.projetService.getProjetbyId(id);
    }
}
