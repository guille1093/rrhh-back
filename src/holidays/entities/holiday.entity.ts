import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @Column({ type: 'date' })
  @ApiProperty()
  date: Date;

  @Column({ type: 'varchar', length: 100, default: 'NACIONAL' })
  @ApiProperty({ enum: ['NACIONAL', 'EMPRESA'] })
  type: 'NACIONAL' | 'EMPRESA';
}
