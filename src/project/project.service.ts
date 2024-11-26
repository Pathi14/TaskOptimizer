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
        return this.prisma.projet.findMany();
    }

    async deleteProject(id: number): Promise<void>{
        await this.prisma.projet.delete({
            where: {id},
        });
    }

    async getProjectbyId(id: number): Promise<Projet> {
        return this.prisma.projet.findUnique({
            where: { id },
        });
    }

    async addUsersToProject(projectId: number, utilisateurIds: number[]): Promise<void> {
        if (!utilisateurIds || utilisateurIds.length === 0) {
            throw new Error('Aucun utilisateur à ajouter.');
        }

        await this.prisma.projet.update({
            where: { id: projectId },
            data: {
                utilisateurs: {
                    connect: utilisateurIds.map((id) => ({ id })),
                },
            },
        });
    }
}
