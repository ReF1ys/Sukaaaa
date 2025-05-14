import { apiClient } from '../lib/api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('accessToken', response.accessToken);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  async register(userData: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      localStorage.setItem('accessToken', response.accessToken);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  async getProfile() {
    try {
      return await apiClient.get('/auth/profile');
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }
  
  logout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export const authService = new AuthService();
