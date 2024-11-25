import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TacheService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTache(titre: string, description: string, date_echeance:Date, priorite: number, projetId?: number | null, userId?: number | null): Promise<void> {
        
        const existProjet = this.verifExistenceProjet(projetId);
        if (!existProjet) {
            throw new Error(`Projet id ${projetId} inconnu`);
        }

        await this.prisma.tache.create({
            data: {
                titre,
                description: description,
                date_echeance: date_echeance,
                priorite,  
                projetId: projetId ?  projetId : null,
                statutId: null,
                utilisateurId: null,         
            },
        });
    }
    
    async updateTache(id: number, data: { titre?: string; description?: string; date_echeance?: Date; priorite?: number, projetId?: number | null, userId?: number | null }): Promise<Tache> {
        return this.prisma.tache.update({
            where: { id }, 
            data,
        });
    }
    
    async getTaches(): Promise<Tache[]> {
        return this.prisma.tache.findMany();
    }

    async deleteTache(id: number): Promise<void>{
        await this.prisma.tache.delete({
            where: {id},
        });
    }

    async getTacheById(id: number): Promise<Tache> {
        return this.prisma.tache.findUnique({
            where: { id },
        });
    }

    async verifExistenceProjet(projetId: number): Promise<boolean> {
        const projet = await this.prisma.projet.findUnique({
            where: { id: projetId },
        });
        return !!projet;
    }
}
