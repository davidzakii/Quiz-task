import { Test, TestingModule } from '@nestjs/testing';
import { UserQuizService } from './user-quiz.service';

describe('UserQuizService', () => {
  let service: UserQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuizService],
    }).compile();

    service = module.get<UserQuizService>(UserQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
