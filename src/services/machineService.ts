import { apiClient } from '../lib/api';
import { Machine, MachineCreateDto, MachineUpdateDto } from '../types/machine';

class MachineService {
  async getMachines(): Promise<Machine[]> {
    try {
      return await apiClient.get<Machine[]>('/machines');
    } catch (error) {
      console.error('Get machines error:', error);
      throw error;
    }
  }
  
  async getMachineById(id: string): Promise<Machine> {
    try {
      return await apiClient.get<Machine>(`/machines/${id}`);
    } catch (error) {
      console.error(`Get machine ${id} error:`, error);
      throw error;
    }
  }
  
  async createMachine(machineData: MachineCreateDto): Promise<Machine> {
    try {
      return await apiClient.post<Machine>('/machines', machineData);
    } catch (error) {
      console.error('Create machine error:', error);
      throw error;
    }
  }
  
  async updateMachine(id: string, machineData: MachineUpdateDto): Promise<Machine> {
    try {
      return await apiClient.put<Machine>(`/machines/${id}`, machineData);
    } catch (error) {
      console.error(`Update machine ${id} error:`, error);
      throw error;
    }
  }
  
  async deleteMachine(id: string): Promise<void> {
    try {
      await apiClient.delete(`/machines/${id}`);
    } catch (error) {
      console.error(`Delete machine ${id} error:`, error);
      throw error;
    }
  }
}

export const machineService = new MachineService(); 