import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester, SemesterDocument } from './schemas/semeste.schema';

@Injectable()
export class SemesterService {
  constructor(
    @InjectModel(Semester.name) private semesterModel: Model<SemesterDocument>,
  ) {}

  async create(createDto: CreateSemesterDto): Promise<Semester> {
    const semester = new this.semesterModel(createDto);
    return semester.save();
  }

  async findAll(): Promise<Semester[]> {
    return this.semesterModel.find().exec();
  }

  async findOne(id: string): Promise<Semester> {
    const semester = await this.semesterModel.findById(id).exec();
    if (!semester) {
      throw new NotFoundException(`Semester with ID ${id} not found`);
    }
    return semester;
  }

  async update(id: string, updateDto: UpdateSemesterDto): Promise<Semester> {
    const updated = await this.semesterModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Semester with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.semesterModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Semester with ID ${id} not found`);
    }
  }
}
