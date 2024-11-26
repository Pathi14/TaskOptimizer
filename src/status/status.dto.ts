import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStatutDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}