import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Utilisateur as User, Prisma } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.nom || !createUserDto.adresse_mail || !createUserDto.mot_de_passe) {
      throw new BadRequestException('Missing required fields');
    }

    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
        if (error instanceof BadRequestException || error instanceof ConflictException) {
            throw error;
        }
        throw new BadRequestException('Invalid request');
    }
    
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUser(Number(id));
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: Prisma.UtilisateurUpdateInput): Promise<User> {
    if(id === undefined || id === null){
      throw new BadRequestException('Missing required fields');
    }
    if (!data) {
        throw new BadRequestException('None value to update');
    }

    try {
      return this.userService.updateUser(Number(id), data);
    } catch (error) {
        if (error instanceof BadRequestException || error instanceof ConflictException) {
            throw error;
        }
        throw new BadRequestException('Invalid request');
    }
    
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    if(id === undefined || id === null){
      throw new BadRequestException('Missing required fields');
    }

    try {
        await this.userService.deleteUser(Number(id));
        return { message: `User with ID ${id} has been deleted successfully.` };
    } catch (error) {
        if (error.message.includes('not found')) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}