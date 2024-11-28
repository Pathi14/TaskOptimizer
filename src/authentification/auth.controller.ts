import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Utilisateur } from '@prisma/client';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() authDTO: AuthDto): Promise<{ accessToken: string; user: Utilisateur }> {
    return this.userService.createUser(authDTO);
  }

  @Post('signin')
  async signIn(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.userService.authenticateUser(authDto);
  }
}