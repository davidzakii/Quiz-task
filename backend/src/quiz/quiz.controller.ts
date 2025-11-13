import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { errorResponse, successResponse } from 'src/utils/api-response';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  async create(@Body() createDto: CreateQuizDto) {
    try {
      const quiz = await this.quizService.create(createDto);
      return successResponse(quiz, 'Quiz created successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  async findAll() {
    try {
      const quizzes = await this.quizService.findAll();
      return successResponse(quizzes, 'Quizzes retrieved successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  async findOne(@Param('id') id: string) {
    try {
      const quiz = await this.quizService.findOne(id);
      return successResponse(quiz, 'Quiz retrieved successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(
        message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update quiz by ID' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateQuizDto) {
    try {
      const quiz = await this.quizService.update(id, updateDto);
      return successResponse(quiz, 'Quiz updated successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(
        message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz by ID (Admin only)' })
  async remove(@Param('id') id: string) {
    try {
      await this.quizService.remove(id);
      return successResponse(null, 'Quiz deleted successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(
        message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('semester/:semesterId')
  @ApiOperation({ summary: 'Get all quizzes for a specific semester' })
  async findBySemester(@Param('semesterId') semesterId: string) {
    try {
      const quizzes = await this.quizService.findBySemester(semesterId);
      return successResponse(quizzes, 'Quizzes retrieved successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
