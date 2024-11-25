import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsEmail()
  adresse_mail: string;

  @IsNotEmpty()
  @IsString()
  mot_de_passe: string;
}