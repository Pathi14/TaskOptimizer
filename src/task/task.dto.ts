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
  @Max(10)
  evolution: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

}