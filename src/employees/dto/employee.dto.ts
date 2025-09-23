import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class EmployeeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  @IsNumber()
  positionId?: number;
}
