import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({ example: 'Fall 2025' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-09-01' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2025-12-31' })
  @IsDateString()
  endDate: Date;
}
