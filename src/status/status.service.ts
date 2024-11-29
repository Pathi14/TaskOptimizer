import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Statut, Prisma } from '@prisma/client';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}
  
  async createStatus(data: {nom: string, projectId: number}): Promise<Statut> {
    if(data.projectId){
      const existProject = this.verifExistenceProject(data.projectId);
      if (!existProject) {
          throw new Error(`Projet id ${data.projectId} invalid`);
      }
    }
    return this.prisma.statut.create({
      data:{
        nom: data.nom,
        projet:  { connect: { id: data.projectId } },
      },
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
  
  async getStatusByProjectId(projectId: number): Promise<Statut[]> {
    return this.prisma.statut.findMany({
      where: {
        projetId: projectId,
      },
    });
  }


  async updateStatus(id: number, data: { projectId?: number | null, nom?: string }): Promise<Statut> {

    if(data.projectId){
      const existProject = this.verifExistenceProject(data.projectId);
      if (!existProject) {
          throw new Error(`Projet id ${data.projectId} invalid`);
      }
    }

    return this.prisma.statut.update({
      where: { id: id },
      data:{
        nom: data.nom,
        projet: data.projectId !== undefined && data.projectId !== null
        ? { connect: { id: data.projectId } }
        : undefined,
      },
    });
  }

  async deleteStatus(id: number): Promise<Statut> {
    return this.prisma.statut.delete({
      where: { id },
    });
  }

  async verifExistenceProject(projetId?: number | null): Promise<boolean> {
    if (!projetId) return false; 
    const projet = await this.prisma.projet.findUnique({
      where: { id: projetId },
    });
    return !!projet;
  }
}