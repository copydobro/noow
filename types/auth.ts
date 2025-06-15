export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // В реальном приложении будет хешированный
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}