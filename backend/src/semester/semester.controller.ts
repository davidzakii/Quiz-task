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
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { errorResponse, successResponse } from 'src/utils/api-response';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Semesters')
@Controller('semesters')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new semester' })
  async create(@Body() createDto: CreateSemesterDto) {
    try {
      const semester = await this.semesterService.create(createDto);
      return successResponse(semester, 'Semester created successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all semesters' })
  async findAll() {
    try {
      const semesters = await this.semesterService.findAll();
      return successResponse(semesters, 'Semesters retrieved successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get semester by ID' })
  async findOne(@Param('id') id: string) {
    try {
      const semester = await this.semesterService.findOne(id);
      return successResponse(semester, 'Semester retrieved successfully');
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
  @ApiOperation({ summary: 'Update semester by ID' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateSemesterDto) {
    try {
      const semester = await this.semesterService.update(id, updateDto);
      return successResponse(semester, 'Semester updated successfully');
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
  @ApiOperation({ summary: 'Delete semester by ID (Admin only)' })
  async remove(@Param('id') id: string) {
    try {
      await this.semesterService.remove(id);
      return successResponse(null, 'Semester deleted successfully');
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
}
