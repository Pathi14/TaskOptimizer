import { Injectable } from '@nestjs/common';
import { Prisma, Projet } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ProjetService {
    constructor(private prisma: PrismaService) {}
    
    async addProjet(data: Prisma.ProjetCreateInput): Promise<void> {
        await this.prisma.projet.create({
            data,
        });
    }
    
    async updateProjet(id: number, data: Prisma.ProjetCreateInput): Promise<Projet> {
        return this.prisma.projet.update({
            where: { id }, 
            data,
        });
    }
    
    async getProjets(): Promise<Projet[]> {
        return this.prisma.projet.findMany();
    }

    async deleteProjet(id: number): Promise<void>{
        await this.prisma.projet.delete({
            where: {id},
        });
    }

    async getProjetbyId(id: number): Promise<Projet> {
        return this.prisma.projet.findUnique({
            where: { id },
        });
    }

    async addUtilisateurProjet(projectId: number, utilisateurIds: number[]): Promise<void> {
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
