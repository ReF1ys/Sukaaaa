export interface ProductionRecord {
  id: string;
  machineId: string;
  orderId: string;
  startTime: string;
  endTime: string;
  quantity: number;
  operatorId: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionCreateDto {
  machineId: string;
  orderId: string;
  startTime: string;
  endTime?: string;
  quantity: number;
  operatorId: string;
  notes?: string;
}

export interface ProductionUpdateDto {
  endTime?: string;
  quantity?: number;
  notes?: string;
}

export interface ProductionAnalytics {
  totalProduction: number;
  averageProductionRate: number;
  machineUtilization: {
    machineId: string;
    machineName: string;
    utilization: number;
  }[];
  productionByDate: {
    date: string;
    quantity: number;
  }[];
} 