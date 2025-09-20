import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

export type RequestStatus = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

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
  type: string; // vacaciones, inasistencia, etc.

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description?: string;

  @Column({ type: 'date' })
  @ApiProperty()
  date: Date;

  @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
  @ApiProperty({ enum: ['PENDIENTE', 'APROBADA', 'RECHAZADA'] })
  status: RequestStatus;
}
