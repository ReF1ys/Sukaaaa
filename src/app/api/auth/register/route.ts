import { NextRequest, NextResponse } from 'next/server';
import { RegisterCredentials } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: RegisterCredentials = await req.json();
    
    if (!body.email || !body.password || !body.fullName) {
      return NextResponse.json(
        { message: 'Email, пароль и имя обязательны' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Неверный формат email' },
        { status: 400 }
      );
    }
    
    const mockUser = {
      id: Date.now().toString(),
      email: body.email,
      fullName: body.fullName,
      role: body.role || 'user',
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    return NextResponse.json({
      accessToken: mockToken,
      user: mockUser
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Ошибка при регистрации' },
      { status: 500 }
    );
  }
} 