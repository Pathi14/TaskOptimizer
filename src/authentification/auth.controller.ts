import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Utilisateur } from '@prisma/client';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() authDTO: AuthDto): Promise<{ accessToken: string; user: { id: number; nom: string } }> {
    return this.userService.createUser(authDTO);
  }
  @Post('signin')
  async login(@Body() authDto: AuthDto): Promise<{ accessToken: string; user: { id: number; nom: string } }> {
    return this.userService.authenticateUser(authDto);
  }
}