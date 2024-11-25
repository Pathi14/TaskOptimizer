import { Injectable } from '@nestjs/common';
import { Projet } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ProjetService {
    constructor(private prisma: PrismaService) {}
    
    async addProjet(titre: string, description: string): Promise<void> {
        await this.prisma.projet.create({
            data: {
                titre: titre,
                description: description,      
            },
        });
    }
    
    async updateProjet(id: number, data: { titre?: string; description?: string }): Promise<Projet> {
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
}
