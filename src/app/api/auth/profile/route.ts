import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/authUtils';

export async function GET(req: NextRequest) {
  try {

    const token = getAuthToken(req);
    
    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      fullName: 'Тестовый Пользователь',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockUser);
    
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении профиля' },
      { status: 500 }
    );
  }
} 