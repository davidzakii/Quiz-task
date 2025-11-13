import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { successResponse, errorResponse } from 'src/utils/api-response';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new announcement' })
  async create(@Body() dto: CreateAnnouncementDto) {
    try {
      const announcement = await this.announcementsService.create(dto);
      return successResponse(announcement, 'Announcement created successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all announcements' })
  async findAll() {
    try {
      const announcements = await this.announcementsService.findAll();
      return successResponse(
        announcements,
        'Announcements retrieved successfully',
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get announcement by ID' })
  async findOne(@Param('id') id: string) {
    try {
      const announcement = await this.announcementsService.findOne(id);
      return successResponse(
        announcement,
        'Announcement retrieved successfully',
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update an announcement' })
  async update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    try {
      const updated = await this.announcementsService.update(id, dto);
      return successResponse(updated, 'Announcement updated successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete an announcement' })
  async remove(@Param('id') id: string) {
    try {
      await this.announcementsService.remove(id);
      return successResponse(null, 'Announcement deleted successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.NOT_FOUND);
    }
  }
}
