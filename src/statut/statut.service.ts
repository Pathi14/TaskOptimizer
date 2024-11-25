import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Statut, Prisma } from '@prisma/client';

@Injectable()
export class StatutService {
  constructor(private prisma: PrismaService) {}

  async createStatut(data: Prisma.StatutCreateInput): Promise<Statut> {
    return this.prisma.statut.create({
      data,
    });
  }

  async getStatut(id: number): Promise<Statut | null> {
    return this.prisma.statut.findUnique({
      where: { id },
      include: {
        taches: true,
      },
    });
  }

  async getStatuts(): Promise<Statut[]> {
    return this.prisma.statut.findMany({
      include: {
        taches: true,
      },
    });
  }

  async updateStatut(id: number, data: Prisma.StatutUpdateInput): Promise<Statut> {
    return this.prisma.statut.update({
      where: { id },
      data,
    });
  }

  async deleteStatut(id: number): Promise<Statut> {
    return this.prisma.statut.delete({
      where: { id },
    });
  }
}