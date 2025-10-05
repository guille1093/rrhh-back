import { IntersectionType } from '@nestjs/swagger';
import { PaginationRequestDTO } from '../../base/dto/base.dto';
import { IsOptional, IsString } from 'class-validator';

export class CompanyFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  industry?: string;
}

export class CompanyPaginationDto extends IntersectionType(
  PaginationRequestDTO,
  CompanyFilterDto,
) {}
