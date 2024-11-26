import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TaskService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTask(data : {
        titre: string, 
        description: string, 
        date_echeance:Date, 
        priorite: number, 
        projetId?: number | null, 
        utilisateurId?: number | null, 
        statutId?: number | null}): Promise<void> {
        
        if(data.projetId){
            const existProject = this.verifExistenceProject(data.projetId);
            if (!existProject) {
                throw new Error(`Projet id ${data.projetId} invalid`);
            }
        }

        if(data.utilisateurId){
            const existUser = this.verifExistenceUser(data.utilisateurId);
            if (!existUser) {
                throw new Error(`Utilisateur id ${data.utilisateurId} invalid`);
            }
        }

        if(data.statutId){
            const existStatus = this.verifyExistenceStatus(data.utilisateurId);
            if (!existStatus) {
                throw new Error(`Status id ${data.utilisateurId} invalid`);
            }
        }

        await this.prisma.tache.create({
            data: {
                titre: data.titre,
                description: data.description,
                date_echeance: data.date_echeance,
                priorite: data.priorite,
                projet: data.projetId
                  ? { connect: { id: data.projetId } }
                  : undefined, 
                utilisateur: data.utilisateurId
                  ? { connect: { id: data.utilisateurId } }
                  : undefined, 
                statut: data.statutId
                  ? { connect: { id: data.statutId } }
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
          projetId?: number | null;
          utilisateurId?: number | null;
          statutId?: number | null;
        }
      ): Promise<Tache> {
        if(data.projetId){
            const existProject = this.verifExistenceProject(data.projetId);
            if (!existProject) {
                throw new Error(`Projet id ${data.projetId} invalid`);
            }
        }

        if(data.utilisateurId){
            const existUser = this.verifExistenceUser(data.utilisateurId);
            if (!existUser) {
                throw new Error(`Utilisateur id ${data.utilisateurId} invalid`);
            }
        }

        if(data.statutId){
            const existStatus = this.verifyExistenceStatus(data.utilisateurId);
            if (!existStatus) {
                throw new Error(`Status id ${data.utilisateurId} invalid`);
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
            utilisateur: data.utilisateurId
              ? { connect: { id: data.utilisateurId } }
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

    async deleteTask(id: number): Promise<void>{
        await this.prisma.tache.delete({
            where: {id},
        });
    }

    async getTaskById(id: number): Promise<Tache> {
        return this.prisma.tache.findUnique({
            where: { id },
        });
    }

    async verifExistenceProject(projetId?: number | null): Promise<boolean> {
        if (!projetId) return false; // Si l'ID est invalide, on retourne `false`
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
      
      async verifyExistenceStatus(statutId?: number | null): Promise<boolean> {
        if (!statutId) return false;
        const status = await this.prisma.statut.findUnique({
          where: { id: statutId },
        });
        return !!status;
      }
      
}