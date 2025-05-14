import { UserRole } from './auth';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
