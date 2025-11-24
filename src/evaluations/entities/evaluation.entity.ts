import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

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

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.evaluations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Employee })
  employee: Employee;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    example: '2024-Q1',
    description: 'Periodo de la evaluación (ej. 2024-Q1, Semestral)',
  })
  period: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    example: 'Desempeño',
    description:
      'Tipo de evaluación: desempeño, capacitación, autoevaluación, etc.',
  })
  type: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2024-04-30', description: 'Fecha de la evaluación' })
  date: Date;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Evaluador: jefe directo o RRHH',
  })
  evaluator: string;

  @Column({ type: 'enum', enum: EvaluationStatus })
  @ApiProperty({ enum: EvaluationStatus, example: EvaluationStatus.PENDIENTE })
  status: EvaluationStatus;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({
    example: 9.5,
    description: 'Calificación global numérica',
    required: false,
  })
  globalScoreNumeric?: number;

  @Column({ type: 'enum', enum: EvaluationGlobalScore, nullable: true })
  @ApiProperty({
    enum: EvaluationGlobalScore,
    example: EvaluationGlobalScore.CUMPLE,
    description: 'Calificación global en escala',
    required: false,
  })
  globalScoreScale?: EvaluationGlobalScore;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Comentarios/Feedback', required: false })
  feedback?: string;

  @Column({ type: 'boolean', nullable: true })
  @ApiProperty({
    description:
      '¿El empleado fue notificado/conforme? (importante legalmente)',
    required: false,
  })
  employeeAcknowledged?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'Fecha de conformidad del empleado (si aplica)',
    required: false,
    type: String,
    format: 'date-time',
  })
  employeeAcknowledgedAt?: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false, description: 'Notas adicionales' })
  notes?: string;
}
