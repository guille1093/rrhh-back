import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';

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

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  type: string; // pre-ocupacional, control, etc.

  @Column({ type: 'date' })
  @ApiProperty()
  date: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  notes?: string;
}
