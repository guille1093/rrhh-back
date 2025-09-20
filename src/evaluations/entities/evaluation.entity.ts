import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.evaluations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  type: string; // desempeño, capacitación, autoevaluación, etc.

  @Column({ type: 'date' })
  @ApiProperty()
  date: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  notes?: string;
}
