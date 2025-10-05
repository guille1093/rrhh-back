import { IntersectionType } from '@nestjs/swagger';
import { PaginationRequestDTO } from '../../base/dto/base.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class DepartmentFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  areaId?: number;
}

export class DepartmentPaginationDto extends IntersectionType(
  PaginationRequestDTO,
  DepartmentFilterDto,
) {}
