export enum OrderStatus {
  PENDING = 'pending',
  IN_PRODUCTION = 'in_production',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  description: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  priority: number;
  machineIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreateDto {
  customerName: string;
  customerEmail: string;
  description: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  priority?: number;
  machineIds?: string[];
}

export interface OrderUpdateDto {
  customerName?: string;
  customerEmail?: string;
  description?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  priority?: number;
  machineIds?: string[];
} 