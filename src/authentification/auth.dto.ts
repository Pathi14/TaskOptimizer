import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
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