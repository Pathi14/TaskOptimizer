import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma, Projet } from '@prisma/client';
import { CreateProjectDto } from './project.dto';
import { create } from 'domain';

@Controller()
export class ProjetController {

    constructor(private readonly projetService: ProjectService) {}

    @Post()
    async createProject(
    @Body() createProjectDto: CreateProjectDto
    ) {
        return this.projetService.addProject(createProjectDto);
    }

    @Get()
    async getProjects(): Promise<Projet[]> {
        return this.projetService.getProjects();
    }
    
    @Put(':id')
    async updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Prisma.ProjetUpdateInput,
    ): Promise<Projet> {
        return this.projetService.updateProject(id, body);
    }

    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.projetService.deleteProject(id);
    }

    @Get(':id')
    async getProjectbyId(@Param('id', ParseIntPipe) id: number): Promise<Projet> {
        return this.projetService.getProjectbyId(id);
    }

    @Put('/users/:idProject')
    async addUsersToProjet(
        @Param('idProject', ParseIntPipe) idProject: number,
        @Body() body: { utilisateurIds: number[] }
    ): Promise<void>{
        await this.projetService.addUsersToProject(idProject, body.utilisateurIds);
    }
}
