import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Statut, Prisma } from '@prisma/client';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async createStatus(data: Prisma.StatutCreateInput): Promise<Statut> {
    return this.prisma.statut.create({
      data,
    });
  }

  async getStatusById(id: number): Promise<Statut | null> {
    return this.prisma.statut.findUnique({
      where: { id },
      include: {
        taches: true,
      },
    });
  }

  async getStatus(): Promise<Statut[]> {
    return this.prisma.statut.findMany({
      include: {
        taches: true,
      },
    });
  }

  async updateStatus(id: number, data: Prisma.StatutUpdateInput): Promise<Statut> {
    return this.prisma.statut.update({
      where: { id },
      data,
    });
  }

  async deleteStatus(id: number): Promise<Statut> {
    return this.prisma.statut.delete({
      where: { id },
    });
  }
}