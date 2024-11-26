import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsString()
  description: string;
  
  @IsDate()
  date_echeance: Date;
  
  @IsNumber()
  @Max(3)
  priorite: number;

  @IsNumber()
  statutId: number;
  
  @IsNumber()
  projectId: number;

  @IsNumber()
  utilisateurId: number;

}