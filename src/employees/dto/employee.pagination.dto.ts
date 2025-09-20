import { IntersectionType } from '@nestjs/swagger';
import { PaginationRequestDTO } from '../../base/dto/base.dto';
// Define los campos de búsqueda para Employee
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class EmployeeFilterDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  positionId?: number;
}

export class EmployeePaginationDto extends IntersectionType(
  PaginationRequestDTO,
  EmployeeFilterDto,
) {}
