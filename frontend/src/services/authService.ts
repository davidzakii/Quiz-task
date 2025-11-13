import apiClient from "../api/axios";
import type { LoginRequest, User } from "../types";
import type { ApiSuccessResponse } from "../utils/api-response";

const authBasePath = "/auth";

export const authService = {
  login: async (payload: LoginRequest) => {
    const { data } = await apiClient.post<ApiSuccessResponse<string>>(
      `${authBasePath}/login`,
      payload
    );
    return data.data;
  },
  profile: async () => {
    const { data } = await apiClient.get<User>(`${authBasePath}/profile`);
    return data;
  },
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { data } = await apiClient.post<ApiSuccessResponse<null>>(
      `${authBasePath}/register`,
      payload
    );
    return data.data;
  },
};

export type AuthService = typeof authService;
