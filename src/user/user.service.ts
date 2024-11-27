import { Injectable ,  ConflictException , UnauthorizedException , BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Utilisateur, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/authentification/auth.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(data: Prisma.UtilisateurCreateInput): Promise<{ accessToken: string; user: Utilisateur }> {
    const existingUser = await this.prisma.utilisateur.findUnique({
      where: { adresse_mail: data.adresse_mail },
    });
 
    if (existingUser) {
      throw new ConflictException('Adresse e-mail déjà utilisée');
    }
 
    const hashedPassword = await bcrypt.hash(data.mot_de_passe, 10);
    data.mot_de_passe = hashedPassword;
 
    const user = await this.prisma.utilisateur.create({
      data,
    });
 
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);
 
    return { accessToken, user };
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
  async authenticateUser(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { adresse_mail, mot_de_passe } = authDto;
    const user = await this.prisma.utilisateur.findUnique({
      where: { adresse_mail },
    });
 
    if (!user || !(await bcrypt.compare(mot_de_passe, user.mot_de_passe))) {
      throw new UnauthorizedException('Adresse e-mail ou mot de passe incorrect');
    }
 
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);
 
    return { accessToken };
  }
}
