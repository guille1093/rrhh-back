import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Contract } from './contract.entity';
import { Request } from '../../requests/entities/request.entity';
import { Health } from '../../health/entities/health.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '@/departments/entities/department.entity';
import { Position } from '@/positions/entities/position.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty()
  email: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  department: Department;

  @ManyToOne(() => Position, (position) => position.employees, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  position: Position;

  // Campos adicionales: dirección, contactos, documentación, etc. se agregan luego

  @OneToMany(() => Contract, (contract) => contract.employee)
  contracts: Contract[];

  @OneToMany(() => Request, (request) => request.employee)
  requests: Request[];

  @OneToMany(() => Health, (health) => health.employee)
  healthRecords: Health[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations: Evaluation[];
}
