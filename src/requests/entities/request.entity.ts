import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export type RequestStatus =
  | 'PENDIENTE'
  | 'APROBADA'
  | 'RECHAZADA'
  | 'JUSTIFICADA';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.requests, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  type: string; // vacaciones, licencia, inasistencia, etc.

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    required: false,
    description: 'Periodo de la solicitud (ej. Vacaciones 2024)',
  })
  period?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    required: false,
    description: 'Tipo de ausencia/licencia (Enfermedad, Examen, etc.)',
  })
  absenceType?: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false, description: 'Fecha de inicio' })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false, description: 'Fecha de fin' })
  endDate?: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false, description: 'Fecha de retorno' })
  returnDate?: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false, description: 'Fecha de notificación' })
  notifiedAt?: Date;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    required: false,
    description: 'Días correspondientes (por antigüedad)',
  })
  daysCorresponding?: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ required: false, description: 'Días tomados acumulados' })
  daysTaken?: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ required: false, description: 'Saldo de días disponibles' })
  daysAvailable?: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ required: false, description: 'Cantidad de días solicitados' })
  daysRequested?: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    required: false,
    description: 'URL de archivo de justificación/certificado',
  })
  justificationFileUrl?: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    required: false,
    description: 'Fecha de la solicitud (para compatibilidad)',
  })
  date?: Date;

  @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
  @ApiProperty({ enum: ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'JUSTIFICADA'] })
  status: RequestStatus;
}
