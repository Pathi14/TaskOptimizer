import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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
        return this.taskService.addTask(body);
    }

    @Get()
    async getTask(): Promise<Tache[]> {
        return this.taskService.getTasks();
    }
    
    @Put(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { titre?: string; description?: string; date_echeance?: Date; priorite?: number; projetId?: number | null, utilisateurId?: number | null },
    ): Promise<Tache> {
        return this.taskService.updateTask(id, body);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.taskService.deleteTask(id);
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tache> {
        return this.taskService.getTaskById(id);
    }
}
