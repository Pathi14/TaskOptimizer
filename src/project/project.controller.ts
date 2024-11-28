import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma, Projet } from '@prisma/client';
import { CreateProjectDto } from './project.dto';

@Controller()
export class ProjetController {

    constructor(private readonly projectService: ProjectService) {}

    @Post()
    async createProject(
    @Body() createProjectDto: CreateProjectDto
    ) {
        if (!createProjectDto.titre) {
            throw new BadRequestException('Missing required fields');
        }

        try {
            return this.projectService.addProject(createProjectDto);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Get()
    async getProjects(): Promise<Projet[]> {
        return this.projectService.getProjects();
    }
    
    @Put(':id')
    async updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Prisma.ProjetUpdateInput,
    ): Promise<Projet> {
        if (!body) {
            throw new BadRequestException('None value to update');
        }

        try {
            return this.projectService.updateProject(id, body);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        if(id === undefined || id === null){
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.projectService.deleteProject(id);
            return { message: `Task with ID ${id} has been deleted successfully.` };
        } catch (error) {
            if (error.message.includes('not found')) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getProjectbyId(@Param('id', ParseIntPipe) id: number): Promise<Projet> {
        return this.projectService.getProjectbyId(id);
    }

    @Put('/:idProject/users')
    async addUsersToProjet(
        @Param('idProject', ParseIntPipe) idProject: number,
        @Body() body: { usersIds: number[] }
    ): Promise<void>{
        if(idProject === undefined || idProject === null){
            throw new BadRequestException('Missing required fields');
        }
        if (!body) {
            throw new BadRequestException('None value to update');
        }

        try {
            await this.projectService.addUsersToProject(idProject, body.usersIds);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Delete('/:idProject/users/:idUser')
    async removeUserFromProjet(
        @Param('idProject', ParseIntPipe) idProject: number,
        @Param('idUser', ParseIntPipe) idUser: number
    ): Promise<void> {
        if (idProject === undefined || idProject === null || idUser === undefined || idUser === null) {
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.projectService.removeUserFromProject(idProject, idUser);
        } catch (error) {
            if (error.message.includes('n\'existe pas') || error.message.includes('n\'est pas associé')) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Invalid request');
        }
    }

}
