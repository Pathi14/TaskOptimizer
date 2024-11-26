import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TaskService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTask(data : {titre: string, description: string, date_echeance:Date, priorite: number, projetId?: number | null, utilisateurId?: number | null}): Promise<void> {
        
        const existProject = this.verifExistenceProject(data.projetId);
        if (!existProject) {
            throw new Error(`Projet id ${data.projetId} inconnu`);
        }

        const existUser = this.verifExistenceUser(data.utilisateurId);
        if (!existUser) {
            throw new Error(`Utilisateur id ${data.utilisateurId} inconnu`);
        }

        await this.prisma.tache.create({
            data,
        });
    }
    
    async updateTask(id: number, data: { titre?: string; description?: string; date_echeance?: Date; priorite?: number, projetId?: number | null, utilisateurId?: number | null }): Promise<Tache> {
        return this.prisma.tache.update({
            where: { id }, 
            data,
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

    async verifExistenceProject(projetId: number): Promise<boolean> {
        const projet = await this.prisma.projet.findUnique({
            where: { id: projetId },
        });
        return !!projet;
    }

    
    async verifExistenceUser(utilisateurId: number) {
        const utilisateur = await this.prisma.utilisateur.findUnique({
            where: { id: utilisateurId},
        })
        return !!utilisateur;
    }
}
