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
        statusId: number,
        evolution?: number}): Promise<void> {

        if(data.statusId){
            const existStatus = this.verifyExistenceStatus(data.statusId);
            if (!existStatus) {
                throw new Error(`Status id ${data.statusId} invalid`);
            }
        }
  
        if (data.priorite !== undefined && (data.priorite < 1 || data.priorite > 3)) {
          throw new Error('La priorité doit être un nombre compris entre 1 et 3.');
        }
      
        if (data.evolution !== undefined && (data.evolution < 1 || data.evolution > 10)) {
          throw new Error('L\'évolution doit être un nombre compris entre 1 et 10.');
        }

        await this.prisma.tache.create({
            data: {
                titre: data.titre,
                description: data.description,
                date_echeance: data.date_echeance,
                priorite: data.priorite,
                statut: data.statusId
                  ? { connect: { id: data.statusId } }
                  : undefined,
                evolution: data.evolution,
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
          statutId?: number;
          evolution?: number;
        }
      ): Promise<Tache> {

        if(data.statutId){
            const existStatus = this.verifyExistenceStatus(data.statutId);
            if (!existStatus) {
                throw new Error(`Status id ${data.statutId} invalid`);
            }
        }

        if (data.priorite !== undefined && (data.priorite < 1 || data.priorite > 3)) {
          throw new Error('La priorité doit être un nombre compris entre 1 et 3.');
        }
      
        if (data.evolution !== undefined && (data.evolution < 1 || data.evolution > 10)) {
          throw new Error('L\'évolution doit être un nombre compris entre 1 et 10.');
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
            statut: data.statutId
              ? { connect: { id: data.statutId } }
              : undefined,
            evolution: data.evolution,
          },
        });
    }
      
    
    async getTacheByProjectId(statusId: number): Promise<Tache[]> {
      return this.prisma.tache.findMany({
        where: {
          statutId: statusId,
        },
      });
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