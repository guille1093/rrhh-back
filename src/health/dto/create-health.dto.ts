import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDateString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ExamType, AptitudeResult } from '../entities/health.entity';

export class CreateHealthDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ enum: ExamType })
  @IsEnum(ExamType)
  @IsNotEmpty()
  type: ExamType;

  @ApiProperty({ enum: AptitudeResult })
  @IsEnum(AptitudeResult)
  @IsNotEmpty()
  result: AptitudeResult;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  realizationDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;
}
