import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQuiz, UserQuizDocument } from './schemas/userQuiz.schema';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class UserQuizService {
  constructor(
    @InjectModel(UserQuiz.name) private userQuizModel: Model<UserQuizDocument>,
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  async create(createDto: CreateUserQuizDto): Promise<UserQuiz> {
    const existUser = await this.userService.findById(createDto.userId);
    const existQuiz = await this.quizService.findOne(createDto.quizId);
    if (!existUser)
      throw new NotFoundException(`User with id ${createDto.userId} not found`);
    if (!existQuiz)
      throw new NotFoundException(`Quiz with id ${createDto.userId} not found`);
    const userQuiz = new this.userQuizModel(createDto);
    return userQuiz.save();
  }

  async findAll(): Promise<UserQuiz[]> {
    return this.userQuizModel.find().populate('quizId userId').exec();
  }

  async findOne(id: string): Promise<UserQuiz> {
    const userQuiz = await this.userQuizModel
      .findById(id)
      .populate('quiz user')
      .exec();
    if (!userQuiz) {
      throw new NotFoundException(`UserQuiz with ID ${id} not found`);
    }
    return userQuiz;
  }

  async findByUser(userId: string): Promise<UserQuiz[]> {
    return this.userQuizModel.find({ userId }).populate('quizId').exec();
  }
  async findByQuiz(quizId: string): Promise<UserQuiz[]> {
    return this.userQuizModel.find({ quizId }).populate('quizId').exec();
  }

  async update(id: string, updateDto: UpdateUserQuizDto): Promise<UserQuiz> {
    const updated = await this.userQuizModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`UserQuiz with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userQuizModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`UserQuiz with ID ${id} not found`);
    }
  }
}
