import { Injectable ,  ConflictException, BadRequestException} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Utilisateur, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UtilisateurCreateInput): Promise<Utilisateur> {
    const existingUser = await this.prisma.utilisateur.findUnique({
      where: { adresse_mail: data.adresse_mail },
    });

    if (existingUser) {
      throw new ConflictException('Adresse e-mail déjà utilisée');
    }

    const hashedPassword = await bcrypt.hash(data.mot_de_passe, 10);
    data.mot_de_passe = hashedPassword;

    try {
      return this.prisma.utilisateur.create({
        data,
      });
    } catch (error) {
        if (error instanceof BadRequestException || error instanceof ConflictException) {
            throw error;
        }
        throw new BadRequestException('Invalid request');
    }
  }


  async getUser(id: number): Promise<Utilisateur | null> {
    return this.prisma.utilisateur.findUnique({
      where: { id },
      include: {
        taches: true,
        projets: true,
      },
    });
  }

  async getUsers(): Promise<Utilisateur[]> {
    return this.prisma.utilisateur.findMany({
      include: {
        taches: true,
        projets: true,
      },
    });
  }

  async updateUser(id: number, data: Prisma.UtilisateurUpdateInput): Promise<Utilisateur> {
    try {
      return this.prisma.utilisateur.update({
        where: { id },
        data,
      });
    } catch (error) {
        if (error instanceof BadRequestException || error instanceof ConflictException) {
            throw error;
        }
        throw new BadRequestException('Invalid request');
    }
  }

  async deleteUser(id: number): Promise<void> {
    if(id){
      const existTask = this.verifyExistenceUser(id);
      if (!existTask) {
          throw new Error(`Task id ${id} invalid`);
      }
    }
    await this.prisma.utilisateur.delete({
      where: { id },
    });
  }

  async verifyExistenceUser(id?: number | null): Promise<boolean> {
    if (!id) return false;
    const user = await this.prisma.utilisateur.findUnique({
      where: { id },
    });
    return !!user;
  }
}