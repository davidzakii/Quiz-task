import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    private semesterService: SemesterService,
  ) {}

  async create(createDto: CreateQuizDto): Promise<Quiz> {
    const existSemester = await this.semesterService.findOne(
      createDto.semesterId,
    );
    if (!existSemester)
      throw new NotFoundException(
        `Semester with id ${createDto.semesterId} not found`,
      );
    const quiz = new this.quizModel(createDto);
    return quiz.save();
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().populate('semesterId').exec();
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizModel
      .findById(id)
      .populate('semesterId')
      .exec();
    if (!quiz) throw new NotFoundException(`Quiz with ID ${id} not found`);
    return quiz;
  }

  async update(id: string, updateDto: UpdateQuizDto): Promise<Quiz> {
    const updated = await this.quizModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Quiz with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.quizModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Quiz with ID ${id} not found`);
  }
  async findBySemester(semesterId: string): Promise<Quiz[]> {
    return this.quizModel.find({ semesterId }).exec();
  }
}
