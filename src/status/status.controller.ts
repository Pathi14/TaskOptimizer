import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, ConflictException, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { Statut } from '@prisma/client';
import { CreateStatutDto } from './status.dto';

@Controller()
export class StatutController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createStatus(@Body() createStatutDto: CreateStatutDto): Promise<Statut> {
    if (!createStatutDto.nom) {
      throw new BadRequestException('Missing required fields');
    }

    if (!createStatutDto) {
      throw new BadRequestException('None value to update');
    }

    try {
      return this.statusService.createStatus(createStatutDto)
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
          throw error;
      }
      throw new BadRequestException('Invalid request');
    };
  }

  @Get(':id')
  async getStatusById(@Param('id') id: number): Promise<Statut | null> {
    return this.statusService.getStatusById(Number(id));
  }

  @Get('project/:id')
  async getStatusByProjectId(@Param('id') id: number): Promise<Statut[]> {
    return this.statusService.getStatusByProjectId(Number(id));
  }

  @Put(':id')
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() data: { projectId?: number, nom?: string  }): Promise<Statut> {
    if (!data) {
      throw new BadRequestException('None value to update');
    }

    try {
      return this.statusService.updateStatus(id, data);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
          throw error;
      }
      throw new BadRequestException('Invalid request');
    }
  }

  @Delete(':id')
  async deleteStatus(@Param('id') id: number): Promise<{ message: string }> {
    if(id === undefined || id === null){
      throw new BadRequestException('Missing required fields');
    }

    try {
        await this.statusService.deleteStatus(Number(id));
        return { message: `Task with ID ${id} has been deleted successfully.` };
    } catch (error) {
        if (error.message.includes('not found')) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}