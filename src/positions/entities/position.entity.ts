import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../../departments/entities/department.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { OneToMany, JoinColumn } from 'typeorm';

@Entity('positions')
@Index(['name', 'department'], { unique: true })
export class Position {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @ManyToOne(() => Department, (department) => department.positions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];
}
