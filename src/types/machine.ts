export enum MachineStatus {
  IDLE = 'idle',
  WORKING = 'working',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline',
}

export interface Machine {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  status: MachineStatus;
  lastMaintenance: string;
  nextMaintenance: string;
  productionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface MachineCreateDto {
  name: string;
  model: string;
  serialNumber: string;
  status?: MachineStatus;
  lastMaintenance?: string;
  nextMaintenance?: string;
  productionRate?: number;
}

export interface MachineUpdateDto {
  name?: string;
  model?: string;
  serialNumber?: string;
  status?: MachineStatus;
  lastMaintenance?: string;
  nextMaintenance?: string;
  productionRate?: number;
} 