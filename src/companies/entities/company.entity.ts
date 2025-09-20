import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Area } from '../../areas/entities/area.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  address?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ required: false })
  email?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ required: false })
  industry?: string;

  @OneToMany(() => Area, (area) => area.company)
  areas: Area[];
}
