import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  departmentId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
