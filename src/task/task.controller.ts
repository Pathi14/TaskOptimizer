import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Tache } from '@prisma/client';
import { CreateTaskDto } from './task.dto';

@Controller()
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
    async getStatusByProjectId(@Param('id') id: number): Promise<Tache[]> {
        return this.taskService.getTacheByProjectId(Number(id));
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
}
