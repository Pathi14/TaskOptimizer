import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Utilisateur } from '@prisma/client';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint pour l'inscription d'un utilisateur.
   * @param authDto - Les informations d'inscription de l'utilisateur.
   * @returns L'utilisateur créé.
   */
  @Post('signup')
  async signUp(@Body() authDto: AuthDto): Promise<Utilisateur> {
    return this.userService.createUser(authDto);
  }

  /**
   * Endpoint pour l'authentification d'un utilisateur.
   * @param authDto - Les informations d'authentification de l'utilisateur.
   * @returns Un objet contenant le jeton d'accès JWT.
   */
  @Post('signin')
  async signIn(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.userService.authenticateUser(authDto);
  }
}