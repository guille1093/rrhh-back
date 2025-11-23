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
import { Position } from '../../positions/entities/position.entity';
import { FamilyMember } from './family-member.entity';
import { EmergencyContact } from './emergency-contact.entity';

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

  @ManyToOne(() => Position, (position) => position.employees, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  position: Position;

  // Campos adicionales: dirección, contactos, documentación, etc. (agregados)
  @Column({ type: 'varchar', length: 20, nullable: true })
  @ApiProperty({ required: false })
  documentType?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({ required: false })
  documentNumber?: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  @ApiProperty({ required: false })
  cuil?: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ required: false })
  birthDate?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ required: false })
  nationality?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @ApiProperty({ required: false })
  gender?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @ApiProperty({ required: false })
  civilStatus?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @ApiProperty({ required: false })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  address?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @ApiProperty({ required: false })
  addressNumber?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({ required: false })
  addressFloor?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({ required: false })
  addressApartment?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @ApiProperty({ required: false })
  addressPostalCode?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ required: false })
  addressCity?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ required: false })
  addressProvince?: string;

  @OneToMany(() => Contract, (contract) => contract.employee)
  contracts: Contract[];

  @OneToMany(() => Request, (request) => request.employee)
  requests: Request[];

  @OneToMany(() => Health, (health) => health.employee)
  healthRecords: Health[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations: Evaluation[];

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.employee)
  familyMembers: FamilyMember[];
  @OneToMany(
    () => EmergencyContact,
    (emergencyContact) => emergencyContact.employee,
  )
  emergencyContacts: EmergencyContact[];
}
