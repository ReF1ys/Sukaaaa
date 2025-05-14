import { NextRequest, NextResponse } from 'next/server';
import { LoginCredentials } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: LoginCredentials = await req.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }
    
    const mockUser = {
      id: '1',
      email: body.email,
      fullName: 'Тестовый Пользователь',
      role: 'user',
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    return NextResponse.json({
      accessToken: mockToken,
      user: mockUser
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Ошибка при входе в систему' },
      { status: 500 }
    );
  }
} 