import apiClient from "../api/axios";
import type { Quiz } from "../types";
import type { ApiSuccessResponse } from "../utils/api-response";

const quizzesBasePath = "/quizzes";

// const toId = (value: unknown): string | undefined => {
//   if (!value) return undefined;
//   if (typeof value === "string") return value;
//   if (typeof value === "object" && value !== null) {
//     const obj = value as Record<string, unknown>;
//     return obj._id ? String(obj._id) : obj.id ? String(obj.id) : undefined;
//   }
//   return String(value);
// };

// const toName = (value: unknown): string | undefined => {
//   if (!value) return undefined;
//   if (typeof value === "string") return value;
//   if (typeof value === "object" && value !== null) {
//     const obj = value as Record<string, unknown>;
//     return obj.name ? String(obj.name) : undefined;
//   }
//   return String(value);
// };

const normalizeQuiz = (quiz: Quiz) => {
  const semesterId =
    typeof quiz.semesterId === "object" && quiz.semesterId?._id
      ? String(quiz.semesterId._id)
      : String(quiz.semesterId);

  return {
    ...quiz,
    _id: quiz._id ? String(quiz._id) : undefined,
    semesterId,
  };
};

export const quizService = {
  list: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<Quiz[]>>(
      quizzesBasePath
    );
    return data.data.map(normalizeQuiz);
  },

  listBySemester: async (semesterId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Quiz[]>>(
      `${quizzesBasePath}/semester/${semesterId}`
    );
    return data.data.map(normalizeQuiz);
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Quiz>>(
      `${quizzesBasePath}/${id}`
    );
    return normalizeQuiz(data.data);
  },

  create: async (quiz: Partial<Quiz>) => {
    const { data } = await apiClient.post<ApiSuccessResponse<Quiz>>(
      quizzesBasePath,
      quiz
    );
    return normalizeQuiz(data.data);
  },

  update: async (id: string, quiz: Partial<Quiz>) => {
    const { data } = await apiClient.put<ApiSuccessResponse<Quiz>>(
      `${quizzesBasePath}/${id}`,
      quiz
    );
    return normalizeQuiz(data.data);
  },

  delete: async (id: string) => {
    await apiClient.delete(`${quizzesBasePath}/${id}`);
    return true;
  },
};

export type QuizService = typeof quizService;
