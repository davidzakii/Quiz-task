/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../api/axios";
import type { UserQuiz } from "../types";
import type { ApiSuccessResponse } from "../utils/api-response";

const userQuizzesBasePath = "/user-quizzes";

const normalizeUserQuiz = (userQuiz: UserQuiz): UserQuiz & { id?: string } => {
  return {
    ...userQuiz,
    id: userQuiz._id ? String(userQuiz._id) : undefined,
    userId:
      typeof userQuiz.userId === "object"
        ? (userQuiz.userId as any)._id
        : userQuiz.userId,
    quizId:
      typeof userQuiz.quizId === "object"
        ? (userQuiz.quizId as any)._id
        : userQuiz.quizId,
  };
};

export const userQuizService = {
  list: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<UserQuiz[]>>(
      userQuizzesBasePath
    );
    return data.data.map(normalizeUserQuiz);
  },

  listByUser: async (userId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<UserQuiz[]>>(
      `${userQuizzesBasePath}/user/${userId}`
    );
    return data.data.map(normalizeUserQuiz);
  },

  listByQuiz: async (quizId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<UserQuiz[]>>(
      `${userQuizzesBasePath}/quiz/${quizId}`
    );
    return data.data.map(normalizeUserQuiz);
  },
};

export type UserQuizService = typeof userQuizService;
