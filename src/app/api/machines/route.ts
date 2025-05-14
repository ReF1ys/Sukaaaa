import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken, hasRole } from '@/lib/authUtils';
import { UserRole } from '@/types/auth';
import { MachineCreateDto } from '@/types/machine';

export async function GET(req: NextRequest) {
  try {
    const token = getAuthToken(req);
    
    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    const mockMachines = [
      {
        id: '1',
        name: 'Станок 1',
        model: 'CNC-100',
        serialNumber: '1001-A',
        status: 'working',
        lastMaintenance: '2023-01-15T00:00:00Z',
        nextMaintenance: '2023-07-15T00:00:00Z',
        productionRate: 120,
        createdAt: '2022-05-10T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Станок 2',
        model: 'CNC-200',
        serialNumber: '2002-B',
        status: 'idle',
        lastMaintenance: '2023-02-20T00:00:00Z',
        nextMaintenance: '2023-08-20T00:00:00Z',
        productionRate: 150,
        createdAt: '2022-06-15T00:00:00Z',
        updatedAt: '2023-02-20T00:00:00Z',
      },
      {
        id: '3',
        name: 'Станок 3',
        model: 'CNC-300',
        serialNumber: '3003-C',
        status: 'maintenance',
        lastMaintenance: '2023-03-25T00:00:00Z',
        nextMaintenance: '2023-09-25T00:00:00Z',
        productionRate: 180,
        createdAt: '2022-07-20T00:00:00Z',
        updatedAt: '2023-03-25T00:00:00Z',
      },
    ];
    
    return NextResponse.json(mockMachines);
    
  } catch (error) {
    console.error('Get machines error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении списка станков' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!hasRole(req, [UserRole.ADMIN, UserRole.OPERATOR])) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const body: MachineCreateDto = await req.json();
    
    if (!body.name || !body.model || !body.serialNumber) {
      return NextResponse.json(
        { message: 'Имя, модель и серийный номер обязательны' },
        { status: 400 }
      );
    }
    
    const mockMachine = {
      id: Date.now().toString(),
      name: body.name,
      model: body.model,
      serialNumber: body.serialNumber,
      status: body.status || 'idle',
      lastMaintenance: body.lastMaintenance || new Date().toISOString(),
      nextMaintenance: body.nextMaintenance || new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      productionRate: body.productionRate || 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockMachine);
    
  } catch (error) {
    console.error('Create machine error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании станка' },
      { status: 500 }
    );
  }
} 