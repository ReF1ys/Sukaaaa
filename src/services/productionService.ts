import { apiClient } from '../lib/api';
import { 
  ProductionRecord, 
  ProductionCreateDto, 
  ProductionUpdateDto,
  ProductionAnalytics 
} from '../types/production';

class ProductionService {
  async getProductionRecords(): Promise<ProductionRecord[]> {
    try {
      return await apiClient.get<ProductionRecord[]>('/production');
    } catch (error) {
      console.error('Get production records error:', error);
      throw error;
    }
  }
  
  async getProductionRecordById(id: string): Promise<ProductionRecord> {
    try {
      return await apiClient.get<ProductionRecord>(`/production/${id}`);
    } catch (error) {
      console.error(`Get production record ${id} error:`, error);
      throw error;
    }
  }
  
  async createProductionRecord(data: ProductionCreateDto): Promise<ProductionRecord> {
    try {
      return await apiClient.post<ProductionRecord>('/production', data);
    } catch (error) {
      console.error('Create production record error:', error);
      throw error;
    }
  }
  
  async updateProductionRecord(id: string, data: ProductionUpdateDto): Promise<ProductionRecord> {
    try {
      return await apiClient.put<ProductionRecord>(`/production/${id}`, data);
    } catch (error) {
      console.error(`Update production record ${id} error:`, error);
      throw error;
    }
  }
  
  async deleteProductionRecord(id: string): Promise<void> {
    try {
      await apiClient.delete(`/production/${id}`);
    } catch (error) {
      console.error(`Delete production record ${id} error:`, error);
      throw error;
    }
  }
  
  async getProductionAnalytics(startDate?: string, endDate?: string): Promise<ProductionAnalytics> {
    try {
      const url = '/production/analytics';
      const params: Record<string, string> = {};
      
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      return await apiClient.get<ProductionAnalytics>(url, { params });
    } catch (error) {
      console.error('Get production analytics error:', error);
      throw error;
    }
  }
}

export const productionService = new ProductionService(); 