import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatutDto {
  @IsNotEmpty()
  @IsString()
  nom: string;
}