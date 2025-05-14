import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken, hasRole, verifyToken } from '@/lib/authUtils';
import { UserRole } from '@/types/auth';
import { UserUpdateDto } from '@/types/user';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const token = getAuthToken(req);
    
    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    const tokenData = verifyToken(token);
    
    if (tokenData?.role !== UserRole.ADMIN && tokenData?.userId !== id) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const mockUser = {
      id,
      email: `user${id}@example.com`,
      fullName: `Пользователь ${id}`,
      role: id === '1' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockUser);
    
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении данных пользователя' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const token = getAuthToken(req);
    
    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    const tokenData = verifyToken(token);
    
    if (tokenData?.role !== UserRole.ADMIN && tokenData?.userId !== id) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const body: UserUpdateDto = await req.json();
    
    if (tokenData?.role !== UserRole.ADMIN && body.role) {
      return NextResponse.json(
        { message: 'Нет прав на изменение роли' },
        { status: 403 }
      );
    }
    
    const mockUpdatedUser = {
      id,
      email: body.email || `user${id}@example.com`,
      fullName: body.fullName || `Пользователь ${id}`,
      role: body.role || (id === '1' ? 'admin' : 'user'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockUpdatedUser);
    
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Ошибка при обновлении данных пользователя' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    if (!hasRole(req, [UserRole.ADMIN])) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    
    return NextResponse.json(
      { message: `Пользователь с ID ${id} успешно удален` }
    );
    
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { message: 'Ошибка при удалении пользователя' },
      { status: 500 }
    );
  }
} 