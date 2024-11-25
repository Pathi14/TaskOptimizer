import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TacheService {

    constructor(private prisma: PrismaService) {}

    async addTache(titre: string, description: string, date_echeance:Date, priorite: number): Promise<void> {
        await this.prisma.tache.create({
            data: {
                titre,
                description: description,
                date_echeance,
                priorite,  
                projetId: null,
                statutId: null,
                utilisateurId: null,         
            },
        });
    }

    getTache(): string {
        return 'tache créé!';
    }
}
