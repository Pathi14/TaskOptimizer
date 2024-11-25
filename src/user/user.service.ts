import { Injectable ,  ConflictException} from '@nestjs/common';
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

    return this.prisma.utilisateur.create({
      data,
    });
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
    return this.prisma.utilisateur.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<Utilisateur> {
    return this.prisma.utilisateur.delete({
      where: { id },
    });
  }
}