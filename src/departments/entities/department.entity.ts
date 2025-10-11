import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Area } from '../../areas/entities/area.entity';
import { Position } from '../../positions/entities/position.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { User } from '../../users/entities/user.entity';

@Entity('departments')
@Index(['name', 'area'], { unique: true })
export class Department {
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

  @ManyToOne(() => Area, (area) => area.departments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];

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
