import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDateString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUrl,
} from 'class-validator';

export enum RequestStatus {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
  JUSTIFICADA = 'JUSTIFICADA',
}

export class CreateRequestDto {
  @ApiProperty({ description: 'ID del empleado que realiza la solicitud' })
  @IsInt()
  employeeId: number;

  @ApiProperty({
    description: 'Tipo de solicitud (Vacaciones, Licencia, Inasistencia, etc.)',
    example: 'Vacaciones',
  })
  @IsString()
  type: string;

  @ApiProperty({
    required: false,
    description: 'Periodo de la solicitud (ej. Vacaciones 2024)',
    example: 'Vacaciones 2024',
  })
  @IsOptional()
  @IsString()
  period?: string;

  @ApiProperty({
    required: false,
    description:
      'Tipo de ausencia/licencia (Enfermedad Inculpable, Examen, etc.)',
    example: 'Enfermedad Inculpable',
  })
  @IsOptional()
  @IsString()
  absenceType?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de inicio de la solicitud',
    example: '2024-07-10',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de fin de la solicitud',
    example: '2024-07-30',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de retorno al trabajo',
    example: '2024-07-31',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de notificación al empleado',
    example: '2024-05-25',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  notifiedAt?: string;

  @ApiProperty({
    required: false,
    description: 'Días correspondientes por antigüedad (vacaciones)',
    example: 21,
  })
  @IsOptional()
  @IsNumber()
  daysCorresponding?: number;

  @ApiProperty({
    required: false,
    description: 'Días tomados acumulados (vacaciones)',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  daysTaken?: number;

  @ApiProperty({
    required: false,
    description: 'Saldo de días disponibles (vacaciones)',
    example: 11,
  })
  @IsOptional()
  @IsNumber()
  daysAvailable?: number;

  @ApiProperty({
    required: false,
    description: 'Cantidad de días solicitados',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  daysRequested?: number;

  @ApiProperty({
    required: false,
    description: 'Descripción o motivo de la solicitud',
    example: 'Vacaciones anuales',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    description: 'URL de archivo de justificación/certificado',
    example: 'https://miempresa.com/certificados/medico123.pdf',
  })
  @IsOptional()
  @IsUrl()
  justificationFileUrl?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de la solicitud (para compatibilidad)',
    example: '2024-06-01',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    enum: RequestStatus,
    description: 'Estado de la solicitud',
    example: RequestStatus.PENDIENTE,
    required: false,
  })
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;
}
