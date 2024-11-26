import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Utilisateur as User, Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/user/user.dto';


@Controller('inscription')
export class InscriptionController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}