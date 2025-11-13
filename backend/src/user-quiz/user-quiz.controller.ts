import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserQuizService } from './user-quiz.service';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { errorResponse, successResponse } from 'src/utils/api-response';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('User Quiz')
@Controller('user-quiz')
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user quiz record (Admin only)' })
  @ApiResponse({ status: 201, description: 'User quiz created successfully' })
  async create(
    @Body() createUserQuizDto: CreateUserQuizDto,
    @User('userId') userId: string,
  ) {
    try {
      createUserQuizDto.userId = userId;
      console.log(createUserQuizDto.userId);
      const newUserQuiz = await this.userQuizService.create(createUserQuizDto);
      return successResponse(newUserQuiz, 'User quiz created successfully');
    } catch (error) {
      console.log(createUserQuizDto.userId);
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all user quiz records (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all user quiz records' })
  async findAll() {
    try {
      const userQuiz = await this.userQuizService.findAll();
      return successResponse(userQuiz, 'User quizzes retrieved successfully');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get all quizzes solved by a specific user' })
  @ApiResponse({ status: 200, description: 'List of quizzes solved by user' })
  async findByUser(@User('userId') userId: string) {
    const data = await this.userQuizService.findByUser(userId);
    return successResponse(data, 'User quizzes retrieved successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Get('quiz/:quizId')
  @ApiOperation({ summary: 'Get all users who attempted a specific quiz' })
  @ApiResponse({ status: 200, description: 'List of users who took the quiz' })
  async findByQuiz(@Param('quizId') quizId: string) {
    const data = await this.userQuizService.findByQuiz(quizId);
    return successResponse(data, 'Users retrieved successfully');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user quiz record (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateUserQuizDto: UpdateUserQuizDto,
  ) {
    try {
      const semester = await this.userQuizService.update(id, updateUserQuizDto);
      return successResponse(semester, 'User quiz updated successfully');
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
  @ApiOperation({ summary: 'Delete a user quiz record (Admin only)' })
  @ApiResponse({ status: 200, description: 'User quiz deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.userQuizService.remove(id);
    return successResponse(null, 'User quiz deleted successfully');
  }
}
