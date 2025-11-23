import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Nombre del empleado, tal como figura en el DNI',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Apellido del empleado, tal como figura en el DNI',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Tipo de documento',
    example: 'DNI',
  })
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @ApiProperty({ description: 'Número de documento' })
  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @ApiProperty({
    description: 'Clave Única de Identificación Laboral (CUIL)',
    example: '20-12345678-9',
  })
  @IsNotEmpty()
  @IsString()
  cuil: string;

  @ApiProperty({
    description: 'Fecha de Nacimiento',
    example: '1990-01-15',
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({ description: 'Nacionalidad' })
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty({
    description: 'Género según DNI (Masculino, Femenino, X)',
    example: 'Femenino',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Estado Civil (Soltero, Casado, Divorciado, Viudo)',
    example: 'Soltero',
  })
  @IsNotEmpty()
  @IsString()
  civilStatus: string;

  @ApiProperty({
    description: 'Email personal para envío de recibos de sueldo',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono Móvil' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Calle del domicilio real' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Número del domicilio' })
  @IsNotEmpty()
  @IsString()
  addressNumber: string;

  @ApiProperty({ description: 'Piso del domicilio', required: false })
  @IsOptional()
  @IsString()
  addressFloor?: string;

  @ApiProperty({ description: 'Departamento del domicilio', required: false })
  @IsOptional()
  @IsString()
  addressApartment?: string;

  @ApiProperty({ description: 'Código Postal' })
  @IsNotEmpty()
  @IsString()
  addressPostalCode: string;

  @ApiProperty({ description: 'Localidad' })
  @IsNotEmpty()
  @IsString()
  addressCity: string;

  @ApiProperty({ description: 'Provincia' })
  @IsNotEmpty()
  @IsString()
  addressProvince: string;

  @ApiProperty({ description: 'ID del puesto del empleado' })
  @IsInt()
  positionId: number;
}
