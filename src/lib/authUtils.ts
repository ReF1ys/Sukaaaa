import { NextRequest } from 'next/server';
import { UserRole } from '@/types/auth';

/**
 * Извлекает JWT-токен из заголовка Authorization
 */
export function getAuthToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}

/**
 * Проверяет валидность токена (заглушка)
 */
export function verifyToken(token: string): { userId: string; role: UserRole } | null {
  // Заглушка: В реальном приложении здесь была бы проверка JWT токена
  // Для заглушки просто проверяем, что токен начинается с 'mock_jwt_token_'
  if (token && token.startsWith('mock_jwt_token_')) {
    return {
      userId: '1',
      role: UserRole.USER,
    };
  }
  
  return null;
}

/**
 * Проверяет, имеет ли пользователь нужную роль
 */
export function hasRole(req: NextRequest, requiredRoles: UserRole[]): boolean {
  const token = getAuthToken(req);
  
  if (!token) {
    return false;
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    return false;
  }
  
  return requiredRoles.includes(payload.role);
} 