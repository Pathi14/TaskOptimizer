import { Injectable } from '@nestjs/common';
import { Prisma, Projet } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}
    
    async addProject(data: Prisma.ProjetCreateInput): Promise<void> {
        await this.prisma.projet.create({
            data,
        });
    }
    
    async updateProject(id: number, data: Prisma.ProjetUpdateInput): Promise<Projet> {
        return this.prisma.projet.update({
            where: { id }, 
            data,
        });
    }
    
    async getProjects(): Promise<Projet[]> {
        return this.prisma.projet.findMany({
            include: {
                statuts: true,
            },
        });
    }

    async deleteProject(id: number): Promise<void>{

        if(id){
            const existProjet = this.verifExistenceProject(id);
            if (!existProjet) {
                throw new Error(`Projet id ${id} invalid`);
            }
        }

        await this.prisma.projet.delete({
            where: {id},
        });
    }

    async getProjectbyId(id: number): Promise<Projet> {
        return this.prisma.projet.findUnique({
            where: { id },
        });
    }

    async addUsersToProject(projectId: number, userIds: number[]): Promise<void> {

        if(projectId){
            const existProjet = this.verifExistenceProject(projectId);
            if (!existProjet) {
                throw new Error(`Projet id ${projectId} invalid`);
            }
        }

        for (const userId of userIds) {
            await this.checkUserExists(userId);
            const alreadyAssociated = await this.checkUserProjectAssociation(projectId, userId);
            if (alreadyAssociated) {
                throw new Error(`User with ID ${userId} already has association with project with ID ${projectId}`);
            }
        }

        await Promise.all(
            userIds.map((utilisateurId) =>
                this.prisma.associer.create({
                    data: {
                        id_utilisateur: utilisateurId,
                        id_projet: projectId,
                    },
                })
            )
        );
    }

    async removeUserFromProject(projectId: number, userId: number): Promise<void> {
        
        if(projectId){
            const existProjet = this.verifExistenceProject(projectId);
            if (!existProjet) {
                throw new Error(`Projet id ${projectId} invalid`);
            }
        }

        await this.checkUserExists(userId);
        const associationExists = await this.checkUserProjectAssociation(projectId, userId);
        if (!associationExists) {
            throw new Error(
                `User with ID ${userId} doesn't have association with project with ID ${projectId}`
            );
        }
    
        await this.prisma.associer.deleteMany({
            where: {
                id_projet: projectId,
                id_utilisateur: userId,
            },
        });
    }
    

    private async verifExistenceProject(projetId?: number | null): Promise<boolean> {
        if (!projetId) return false; 
        const projet = await this.prisma.projet.findUnique({
          where: { id: projetId },
        });
        return !!projet;
    }

    private async checkUserExists(userId: number): Promise<void> {
        const userExists = await this.prisma.utilisateur.findUnique({
            where: { id: userId },
        });
        if (!userExists) {
            throw new Error(`User with'ID ${userId} doesn't exist`);
        }
    }

    private async checkUserProjectAssociation(projectId: number, userId: number): Promise<boolean> {
        const associationExists = await this.prisma.associer.findFirst({
            where: {
                id_projet: projectId,
                id_utilisateur: userId,
            },
        });
        return !!associationExists;    }
}
