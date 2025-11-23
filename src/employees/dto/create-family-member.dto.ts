import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateFamilyMemberDto {
  @ApiProperty({ description: 'ID del empleado al que pertenece el familiar' })
  @IsInt()
  employeeId: number;

  @ApiProperty({ description: 'Nombre y apellido del familiar' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Número de documento (DNI / Pasaporte)' })
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    type: 'string',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description:
      'Vínculo con el empleado (Ej: Cónyuge, Hijo/a, Padres, Hijastro/a)',
  })
  @IsNotEmpty()
  @IsString()
  relationship: string;

  @ApiProperty({
    description: 'Indica si tiene una discapacidad',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  disability?: boolean;

  @ApiProperty({
    description:
      'Indica si está a cargo del empleado (para asignaciones familiares)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  dependent?: boolean;

  @ApiProperty({
    description:
      'Indica si está realizando estudios (necesario para presentar certificado escolar)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  schooling?: boolean;
}
