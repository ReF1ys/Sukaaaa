import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken, hasRole } from '@/lib/authUtils';
import { UserRole } from '@/types/auth';
import { MachineUpdateDto } from '@/types/machine';

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
    
    const mockMachine = {
      id,
      name: `Станок ${id}`,
      model: `CNC-${id}00`,
      serialNumber: `${id}00${id}-X`,
      status: ['idle', 'working', 'maintenance'][Number(id) % 3],
      lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
      productionRate: 100 + Number(id) * 20,
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockMachine);
    
  } catch (error) {
    console.error('Get machine error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении данных станка' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    

    if (!hasRole(req, [UserRole.ADMIN, UserRole.OPERATOR])) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const body: MachineUpdateDto = await req.json();
    
    const mockUpdatedMachine = {
      id,
      name: body.name || `Станок ${id}`,
      model: body.model || `CNC-${id}00`,
      serialNumber: body.serialNumber || `${id}00${id}-X`,
      status: body.status || ['idle', 'working', 'maintenance'][Number(id) % 3],
      lastMaintenance: body.lastMaintenance || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: body.nextMaintenance || new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
      productionRate: body.productionRate || (100 + Number(id) * 20),
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockUpdatedMachine);
    
  } catch (error) {
    console.error('Update machine error:', error);
    return NextResponse.json(
      { message: 'Ошибка при обновлении данных станка' },
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
      { message: `Станок с ID ${id} успешно удален` }
    );
    
  } catch (error) {
    console.error('Delete machine error:', error);
    return NextResponse.json(
      { message: 'Ошибка при удалении станка' },
      { status: 500 }
    );
  }
} 