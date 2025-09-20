import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from './employee.entity';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.contracts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  contractType: string;

  @Column({ type: 'date' })
  @ApiProperty()
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false })
  endDate?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ required: false })
  workSchedule?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ required: false })
  salary?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  compensation?: string;
}
