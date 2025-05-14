import { apiClient } from '../lib/api';
import { User, UserUpdateDto } from '../types/user';

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      return await apiClient.get<User[]>('/users');
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }
  
  async getUserById(id: string): Promise<User> {
    try {
      return await apiClient.get<User>(`/users/${id}`);
    } catch (error) {
      console.error(`Get user ${id} error:`, error);
      throw error;
    }
  }
  
  async updateUser(id: string, userData: UserUpdateDto): Promise<User> {
    try {
      return await apiClient.put<User>(`/users/${id}`, userData);
    } catch (error) {
      console.error(`Update user ${id} error:`, error);
      throw error;
    }
  }
  
  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Delete user ${id} error:`, error);
      throw error;
    }
  }
}

export const userService = new UserService(); 