export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  company?: string;
  phone?: string;
  confirmPassword: string;
}