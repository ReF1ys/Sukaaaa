import { NextRequest, NextResponse } from 'next/server';
import { hasRole } from '@/lib/authUtils';
import { UserRole } from '@/types/auth';

export async function GET(req: NextRequest) {
  try {
    if (!hasRole(req, [UserRole.ADMIN])) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const mockUsers = [
      {
        id: '1',
        email: 'admin@example.com',
        fullName: 'Администратор',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'user@example.com',
        fullName: 'Пользователь',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        email: 'operator@example.com',
        fullName: 'Оператор',
        role: 'operator',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    return NextResponse.json(mockUsers);
    
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении списка пользователей' },
      { status: 500 }
    );
  }
} 