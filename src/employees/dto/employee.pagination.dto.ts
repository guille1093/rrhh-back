import { IntersectionType } from '@nestjs/swagger';
import { PaginationRequestDTO } from '../../base/dto/base.dto';
// Define los campos de búsqueda para Employee
import { IsOptional, IsString } from 'class-validator';

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
  companyId?: number;

  @IsOptional()
  departmentId?: number;

  @IsOptional()
  positionId?: number;
}

export class EmployeePaginationDto extends IntersectionType(
  PaginationRequestDTO,
  EmployeeFilterDto,
) {}
