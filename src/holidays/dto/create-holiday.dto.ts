import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateHolidayDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ enum: ['NACIONAL', 'EMPRESA'], required: false })
  @IsOptional()
  @IsString()
  type?: 'NACIONAL' | 'EMPRESA';
}
