import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export enum EvaluationStatus {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADA = 'Finalizada',
  FIRMADA = 'Firmada',
}

export enum EvaluationGlobalScore {
  SUPERA = 'Supera expectativas',
  CUMPLE = 'Cumple',
  NECESITA_MEJORA = 'Necesita mejora',
}

export class CreateEvaluationDto {
  @ApiProperty()
  @IsInt()
  employeeId: number;

  @ApiProperty({
    example: '2024-Q1',
    description: 'Periodo de la evaluación (ej. 2024-Q1, Semestral)',
  })
  @IsString()
  period: string;

  @ApiProperty({
    example: 'Desempeño',
    description:
      'Tipo de evaluación: desempeño, capacitación, autoevaluación, etc.',
  })
  @IsString()
  type: string;

  @ApiProperty({ example: '2024-04-30', description: 'Fecha de la evaluación' })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Evaluador: jefe directo o RRHH',
  })
  @IsString()
  evaluator: string;

  @ApiProperty({ enum: EvaluationStatus, example: EvaluationStatus.PENDIENTE })
  @IsEnum(EvaluationStatus)
  status: EvaluationStatus;

  @ApiProperty({
    example: 9.5,
    description: 'Calificación global numérica o escala (ver globalScoreScale)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  globalScoreNumeric?: number;

  @ApiProperty({
    enum: EvaluationGlobalScore,
    example: EvaluationGlobalScore.CUMPLE,
    description: 'Calificación global en escala',
    required: false,
  })
  @IsOptional()
  @IsEnum(EvaluationGlobalScore)
  globalScoreScale?: EvaluationGlobalScore;

  @ApiProperty({ description: 'Comentarios/Feedback', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({
    description:
      '¿El empleado fue notificado/conforme? (importante legalmente)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  employeeAcknowledged?: boolean;

  @ApiProperty({
    description: 'Fecha de conformidad del empleado (si aplica)',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  employeeAcknowledgedAt?: string;

  @ApiProperty({ required: false, description: 'Notas adicionales' })
  @IsOptional()
  @IsString()
  notes?: string;
}
