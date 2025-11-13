import { Test, TestingModule } from '@nestjs/testing';
import { UserQuizController } from './user-quiz.controller';

describe('UserQuizController', () => {
  let controller: UserQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQuizController],
    }).compile();

    controller = module.get<UserQuizController>(UserQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
