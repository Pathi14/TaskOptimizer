import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TaskService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTask(data : {
        titre: string, 
        description?: string, 
        date_echeance?:Date, 
        priorite?: number, 
        projectId: number, 
        statusId: number}): Promise<void> {
        
        if(data.projectId){
            const existProject = this.verifExistenceProject(data.projectId);
            if (!existProject) {
                throw new Error(`Projet id ${data.projectId} invalid`);
            }
        }

        if(data.statusId){
            const existStatus = this.verifyExistenceStatus(data.statusId);
            if (!existStatus) {
                throw new Error(`Status id ${data.statusId} invalid`);
            }
        }

        await this.prisma.tache.create({
            data: {
                titre: data.titre,
                description: data.description,
                date_echeance: data.date_echeance,
                priorite: data.priorite,
                projet: data.projectId
                  ? { connect: { id: data.projectId } }
                  : undefined, 
                statut: data.statusId
                  ? { connect: { id: data.statusId } }
                  : undefined,
            },
        });
    }

    async updateTask(
        id: number,
        data: {
          titre?: string;
          description?: string;
          date_echeance?: Date;
          priorite?: number;
          projetId?: number;
          statutId?: number;
        }
      ): Promise<Tache> {
        if(data.projetId){
            const existProject = this.verifExistenceProject(data.projetId);
            if (!existProject) {
                throw new Error(`Projet id ${data.projetId} invalid`);
            }
        }

        if(data.statutId){
            const existStatus = this.verifyExistenceStatus(data.statutId);
            if (!existStatus) {
                throw new Error(`Status id ${data.statutId} invalid`);
            }
        }

        return this.prisma.tache.update({
          where: {
            id: id, 
          },
          data: {
            titre: data.titre,
            description: data.description,
            date_echeance: data.date_echeance,
            priorite: data.priorite,
            projet: data.projetId
              ? { connect: { id: data.projetId } }
              : undefined,
            statut: data.statutId
              ? { connect: { id: data.statutId } }
              : undefined,
          },
        });
      }
      
    
    async getTasks(): Promise<Tache[]> {
        return this.prisma.tache.findMany();
    }

    async deleteTask(taskId: number): Promise<void>{
        if(taskId){
            const existTask = this.verifyExistenceTask(taskId);
            if (!existTask) {
                throw new Error(`Task id ${taskId} invalid`);
            }
        }
        await this.prisma.tache.delete({
            where: {id: taskId},
        });
    }

    async getTaskById(id: number): Promise<Tache> {
        return this.prisma.tache.findUnique({
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
      
      async verifExistenceUser(utilisateurId?: number | null): Promise<boolean> {
        if (!utilisateurId) return false;
        const utilisateur = await this.prisma.utilisateur.findUnique({
          where: { id: utilisateurId },
        });
        return !!utilisateur;
      }
      
      async verifyExistenceTask(taskId?: number | null): Promise<boolean> {
        if (!taskId) return false;
        const task = await this.prisma.tache.findUnique({
          where: { id: taskId },
        });
        return !!task;
      }

      async verifyExistenceStatus(statutId?: number | null): Promise<boolean> {
        if (!statutId) return false;
        const status = await this.prisma.statut.findUnique({
          where: { id: statutId },
        });
        return !!status;
      }
      
}