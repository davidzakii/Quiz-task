export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface Semester {
  _id?: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Quiz {
  _id?: string;
  title: string;
  description: string;
  semesterId: string | Semester;
  durationMinutes?: number;
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Announcement {
  _id?: string;
  title: string;
  content: string;
  semesterId: string | Semester;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserQuiz {
  _id?: string;
  userId: string | User;
  quizId: string | Quiz;
  createdAt?: string;
  updatedAt?: string;
}
