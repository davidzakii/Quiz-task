import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class CreateUserQuizDto {
  @ApiProperty({ description: 'ID of the user taking the quiz' })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'ID of the quiz' })
  @IsNotEmpty()
  @IsMongoId()
  quizId: string;

  @ApiProperty({ description: 'Score obtained by the user', required: false })
  @IsOptional()
  @IsNumber()
  score?: number;
}
