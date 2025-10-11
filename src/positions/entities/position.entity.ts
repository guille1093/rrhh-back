import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../../departments/entities/department.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { User } from '../../users/entities/user.entity';

@Entity('positions')
@Index(['name', 'department'], { unique: true })
export class Position {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  code?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description?: string;

  @ManyToOne(() => Department, (department) => department.positions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;
}
