import { apiClient } from '../lib/api';
import { Order, OrderCreateDto, OrderUpdateDto } from '../types/order';

class OrderService {
  async getOrders(): Promise<Order[]> {
    try {
      return await apiClient.get<Order[]>('/orders');
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  }
  
  async getOrderById(id: string): Promise<Order> {
    try {
      return await apiClient.get<Order>(`/orders/${id}`);
    } catch (error) {
      console.error(`Get order ${id} error:`, error);
      throw error;
    }
  }
  
  async createOrder(orderData: OrderCreateDto): Promise<Order> {
    try {
      return await apiClient.post<Order>('/orders', orderData);
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }
  
  async updateOrder(id: string, orderData: OrderUpdateDto): Promise<Order> {
    try {
      return await apiClient.put<Order>(`/orders/${id}`, orderData);
    } catch (error) {
      console.error(`Update order ${id} error:`, error);
      throw error;
    }
  }
  
  async deleteOrder(id: string): Promise<void> {
    try {
      await apiClient.delete(`/orders/${id}`);
    } catch (error) {
      console.error(`Delete order ${id} error:`, error);
      throw error;
    }
  }
}

export const orderService = new OrderService(); 