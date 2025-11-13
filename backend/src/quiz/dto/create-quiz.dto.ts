import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'Math Quiz 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'First quiz for math subject' })
  @IsString()
  description: string;

  @ApiProperty({ example: '64f6b0e5c0a4f3a8d0b1c123' })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  semesterId: string;
}
