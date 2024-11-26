import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import {Statut as User, Prisma } from '@prisma/client';
import { Statut } from '@prisma/client';
import { CreateStatutDto } from './status.dto';

@Controller()
export class StatutController {
  constructor(private readonly statutService: StatusService) {}

  @Post()
  async createStatus(@Body() createStatutDto: CreateStatutDto): Promise<Statut> {
    return this.statutService.createStatus(createStatutDto);
  }

  @Get(':id')
  async getStatusById(@Param('id') id: number): Promise<Statut | null> {
    return this.statutService.getStatusById(Number(id));
  }

  @Get()
  async getStatus(): Promise<Statut[]> {
    return this.statutService.getStatus();
  }

  @Put(':id')
  async updateStatus(@Param('id') id: number, @Body() data: Prisma.StatutUpdateInput): Promise<Statut> {
    return this.statutService.updateStatus(Number(id), data);
  }

  @Delete(':id')
  async deleteStatus(@Param('id') id: number): Promise<Statut> {
    return this.statutService.deleteStatus(Number(id));
  }
}