import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEmergencyContactDto {
  @ApiProperty({ description: 'ID del empleado al que pertenece el contacto' })
  @IsInt()
  employeeId: number;

  @ApiProperty({ description: 'Nombre completo del contacto' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Teléfono primario' })
  @IsNotEmpty()
  @IsString()
  primaryPhone: string;

  @ApiProperty({ required: false, description: 'Teléfono secundario' })
  @IsOptional()
  @IsString()
  secondaryPhone?: string;

  @ApiProperty({
    description: 'Vínculo con el empleado (Amigo, Vecino, Hermano, Pareja)',
  })
  @IsNotEmpty()
  @IsString()
  relationship: string;

  @ApiProperty({ required: false, description: 'Dirección del contacto' })
  @IsOptional()
  @IsString()
  address?: string;
}
