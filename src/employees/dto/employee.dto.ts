import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEmail,
  IsDateString,
} from 'class-validator';

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
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  documentType?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  documentNumber?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  cuil?: string;

  @ApiProperty({ required: false, type: 'string', format: 'date' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  civilStatus?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressNumber?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressFloor?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressApartment?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressPostalCode?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressCity?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  addressProvince?: string;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  @IsNumber()
  positionId?: number;
}
