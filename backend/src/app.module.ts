import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { UserQuizModule } from './user-quiz/user-quiz.module';
import { SemesterModule } from './semester/semester.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_LOCAL'),
      }),
      inject: [ConfigService],
    }),
    AnnouncementsModule,
    SemesterModule,
    AuthModule,
    UserModule,
    QuizModule,
    UserQuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
