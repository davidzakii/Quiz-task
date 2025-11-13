import apiClient from "../api/axios";
import type { Semester } from "../types";
import type { ApiSuccessResponse } from "../utils/api-response";

const semestersBasePath = "/semesters";

const normalizeSemester = (semester: Semester): Semester & { id?: string } => {
  return {
    ...semester,
    id: semester._id ? String(semester._id) : undefined,
  };
};

export const semesterService = {
  list: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<Semester[]>>(
      semestersBasePath
    );
    return data.data.map(normalizeSemester);
  },

  getById: async (semesterId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Semester>>(
      `${semestersBasePath}/${semesterId}`
    );
    return normalizeSemester(data.data);
  },
};

export type SemesterService = typeof semesterService;
