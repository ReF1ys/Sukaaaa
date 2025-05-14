/**
 * Конфигурационный файл для приложения
 * 
 * Содержит важные настройки приложения
 */

// Настройки API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Интервал опроса данных в миллисекундах
export const POLLING_INTERVAL = 30000; // 30 секунд

// Настройки отображения
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DATE_FORMAT: 'DD.MM.YYYY',
  TIME_FORMAT: 'HH:mm',
};

// Статусы станков
export const MACHINE_STATUSES = {
  IDLE: 'idle',
  WORKING: 'working',
  MAINTENANCE: 'maintenance',
};

// Названия цветов в приложении
export const COLORS = {
  PRIMARY: '#6a33f8',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  DANGER: '#f44336',
  INFO: '#2196f3',
}; 