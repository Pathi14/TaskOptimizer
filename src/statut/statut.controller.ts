import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StatutService } from './statut.service';
import {Statut as User, Prisma } from '@prisma/client';
import { Statut } from '@prisma/client';
import { CreateStatutDto } from './statut.dto';

@Controller('statuts')
export class StatutController {
  constructor(private readonly statutService: StatutService) {}

  @Post()
  async createStatut(@Body() createStatutDto: CreateStatutDto): Promise<Statut> {
    return this.statutService.createStatut(createStatutDto);
  }

  @Get(':id')
  async getStatut(@Param('id') id: number): Promise<Statut | null> {
    return this.statutService.getStatut(Number(id));
  }

  @Get()
  async getStatuts(): Promise<Statut[]> {
    return this.statutService.getStatuts();
  }

  @Put(':id')
  async updateStatut(@Param('id') id: number, @Body() data: Prisma.StatutUpdateInput): Promise<Statut> {
    return this.statutService.updateStatut(Number(id), data);
  }

  @Delete(':id')
  async deleteStatut(@Param('id') id: number): Promise<Statut> {
    return this.statutService.deleteStatut(Number(id));
  }
}