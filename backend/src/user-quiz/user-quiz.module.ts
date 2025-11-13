import { Module } from '@nestjs/common';
import { UserQuizService } from './user-quiz.service';
import { UserQuizController } from './user-quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQuiz, UserQuizSchema } from './schemas/userQuiz.schema';
import { UserModule } from 'src/user/user.module';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserQuiz.name, schema: UserQuizSchema },
    ]),
    UserModule,
    QuizModule,
  ],
  providers: [UserQuizService],
  controllers: [UserQuizController],
})
export class UserQuizModule {}
