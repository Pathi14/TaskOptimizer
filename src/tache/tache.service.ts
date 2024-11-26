import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TacheService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTache(data : {titre: string, description: string, date_echeance:Date, priorite: number, projetId?: number | null, utilisateurId?: number | null}): Promise<void> {
        
        const existProjet = this.verifExistenceProjet(data.projetId);
        if (!existProjet) {
            throw new Error(`Projet id ${data.projetId} inconnu`);
        }

        const existUtilisateur = this.verifExistenceUtilisateur(data.utilisateurId);
        if (!existUtilisateur) {
            throw new Error(`Utilisateur id ${data.utilisateurId} inconnu`);
        }

        await this.prisma.tache.create({
            data,
        });
    }
    
    async updateTache(id: number, data: { titre?: string; description?: string; date_echeance?: Date; priorite?: number, projetId?: number | null, utilisateurId?: number | null }): Promise<Tache> {
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

    
    async verifExistenceUtilisateur(utilisateurId: number) {
        const utilisateur = await this.prisma.utilisateur.findUnique({
            where: { id: utilisateurId},
        })
        return !!utilisateur;
    }
}
