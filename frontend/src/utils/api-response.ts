export interface ApiSuccessResponse<T> {
  isPass: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  isPass: false;
  data: null;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> =>
  response.isPass === true;
