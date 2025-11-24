import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export enum ExamType {
  PRE_OCUPACIONAL = 'Pre-ocupacional',
  PERIODICO = 'Periódico',
  POST_OCUPACIONAL = 'Post-ocupacional',
  RETORNO_TRABAJO = 'Retorno al trabajo',
}

export enum AptitudeResult {
  APTO = 'Apto',
  APTO_CON_PREEXISTENCIAS = 'Apto con preexistencias',
  NO_APTO = 'No Apto',
}

@Entity('health_records')
export class Health {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.healthRecords, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({
    type: 'enum',
    enum: ExamType,
  })
  @ApiProperty({ enum: ExamType })
  type: ExamType;

  @Column({
    type: 'enum',
    enum: AptitudeResult,
  })
  @ApiProperty({ enum: AptitudeResult })
  result: AptitudeResult;

  @Column({ type: 'date' })
  @ApiProperty()
  realizationDate: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false })
  expirationDate?: Date | null;
}
