import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  areaId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
