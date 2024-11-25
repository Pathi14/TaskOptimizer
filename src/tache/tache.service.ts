import { Injectable } from '@nestjs/common';
import { Tache } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TacheService {
    
    constructor(private prisma: PrismaService) {}
    
    async addTache(titre: string, description: string, date_echeance:Date, priorite: number): Promise<void> {
        await this.prisma.tache.create({
            data: {
                titre,
                description: description,
                date_echeance: date_echeance,
                priorite,  
                projetId: null,
                statutId: null,
                utilisateurId: null,         
            },
        });
    }
    
    async updateTache(id: number, data: { titre?: string; description?: string; date_echeance?: Date; priorite?: number }): Promise<Tache> {
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
}
