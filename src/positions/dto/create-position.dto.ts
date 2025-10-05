import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  departmentId: number;
}
