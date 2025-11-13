import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import {
  Announcement,
  AnnouncementDocument,
} from './schemas/announcements.schema';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDocument>,
    private semesterService: SemesterService,
  ) {}

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    const existSemester = await this.semesterService.findOne(dto.semesterId);
    if (!existSemester)
      throw new NotFoundException(
        `Semester with id ${dto.semesterId} not found`,
      );
    const announcement = new this.announcementModel(dto);
    return announcement.save();
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().populate('semesterId').exec();
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel
      .findById(id)
      .populate('semesterId')
      .exec();
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return announcement;
  }

  async update(id: string, dto: UpdateAnnouncementDto): Promise<Announcement> {
    const updated = await this.announcementModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.announcementModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
  }
}
