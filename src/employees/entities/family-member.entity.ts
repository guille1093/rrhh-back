import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('family_members')
export class FamilyMember {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.familyMembers, {
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  dni: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 50 })
  relationship: string;

  @Column({ type: 'boolean', default: false })
  disability: boolean;

  @Column({ type: 'boolean', default: false })
  dependent: boolean;

  @Column({ type: 'boolean', default: false })
  schooling: boolean;
}
