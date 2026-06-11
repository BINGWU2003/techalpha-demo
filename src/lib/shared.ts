// Common utilities, API request types, and services

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export const API_BASE_URL = '/api';

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Global API Mock services
export async function mockRequest<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

export const fetchPatentData = () => mockRequest({ status: 'ok', data: [] });
export const fetchCompanyData = () => mockRequest({ status: 'ok', data: [] });
export const fetchReportData = () => mockRequest({ status: 'ok', data: [] });

// Business APIs
export const getSectorData = async () => {};
export const getDeepMineTech = async () => {};
export const getReportList = async () => {};
export const generateReport = async () => {};
export const getAlerts = async () => {};
