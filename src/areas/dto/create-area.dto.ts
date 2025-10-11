import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  companyId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
