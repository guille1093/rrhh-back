import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('emergency_contacts')
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.emergencyContacts, {
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 30 })
  primaryPhone: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  secondaryPhone: string;

  @Column({ type: 'varchar', length: 50 })
  relationship: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;
}
