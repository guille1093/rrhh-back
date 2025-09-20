import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Area } from '@/areas/entities/area.entity';
import { Position } from '@/positions/entities/position.entity';
import { Employee } from '@/employees/entities/employee.entity';

@Entity('departments')
@Index(['name', 'area'], { unique: true })
export class Department {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @ManyToOne(() => Area, (area) => area.departments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
