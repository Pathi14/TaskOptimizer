import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Tache } from '@prisma/client';
import { CreateTaskDto } from './task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(
    @Body() body: CreateTaskDto
    ) {
        if (!body.titre || !body.statusId ) {
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.taskService.addTask(body);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Get('status/:id')
    async getStatusByStatusId(@Param('id', ParseIntPipe) id: number): Promise<Tache[]> {
        return this.taskService.getTacheByStatusId(id);
    }
    
    @Put(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { titre?: string; description?: string; date_echeance?: Date; priorite?: number; projectId?: number | null, statutId?: number | null },
    ): Promise<Tache> {
        if (!body) {
            throw new BadRequestException('None value to update');
        }

        try {
            return this.taskService.updateTask(id, body);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        if(id === undefined || id === null){
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.taskService.deleteTask(id);
            return { message: `Task with ID ${id} has been deleted successfully.` };
        } catch (error) {
            if (error.message.includes('not found')) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tache> {
        return this.taskService.getTaskById(id);
    }

    @Put('/:idTask/users')
    async addUsersToTask(
        @Param('idTask', ParseIntPipe) idTask: number,
        @Body() body: { usersIds: number[] }
    ): Promise<void>{
        if(idTask === undefined || idTask === null){
            throw new BadRequestException('Missing required fields');
        }
        if (!body) {
            throw new BadRequestException('None value to update');
        }

        try {
            await this.taskService.addUsersToTask(idTask, body.usersIds);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Delete('/:idTask/users/:idUser')
    async removeUserFromTask(
        @Param('idTask', ParseIntPipe) idTask: number,
        @Param('idUser', ParseIntPipe) idUser: number
    ): Promise<void> {
        if (idTask === undefined || idTask === null || idUser === undefined || idUser === null) {
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.taskService.removeUserFromTask(idTask, idUser);
        } catch (error) {
            if (error.message.includes('n\'existe pas') || error.message.includes('n\'est pas associé')) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Invalid request');
        }
    }

    @Put('/tags/:idTask')
    async addTagToTask(
        @Param('idTask', ParseIntPipe) idTask: number,
        @Body() body: { tagsIds: number[] }
    ): Promise<void>{
        if(idTask === undefined || idTask === null){
            throw new BadRequestException('Missing required fields');
        }
        if (!body) {
            throw new BadRequestException('None value to update');
        }

        try {
            await this.taskService.addTagToTask(idTask, body.tagsIds);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Invalid request');
        }
        
    }

    @Delete('/:idTask/tags/:idTag')
    async removeTagFromTask(
        @Param('idTask', ParseIntPipe) idTask: number,
        @Param('idTag', ParseIntPipe) idTag: number
    ): Promise<void> {
        if (idTask === undefined || idTask === null || idTag === undefined || idTag === null) {
            throw new BadRequestException('Missing required fields');
        }

        try {
            await this.taskService.removeTagFromTask(idTask, idTag);
        } catch (error) {
            if (error.message.includes('n\'existe pas') || error.message.includes('n\'est pas associé')) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Invalid request');
        }
    }
}
