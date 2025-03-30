import { axiosAuthInstance, axiosPublicInstance } from './axiosConfig';
import { AxiosInstance } from 'axios';

// Generic API service with common methods
class ApiService {
  // GET request
  static async get<T>(url: string, params?: any, requiresAuth: boolean = true): Promise<T> {
    try {
      const instance: AxiosInstance = requiresAuth ? axiosAuthInstance : axiosPublicInstance;
      const response = await instance.get(url, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST request
  static async post<T>(url: string, data: any, requiresAuth: boolean = true): Promise<T> {
    try {
      const instance: AxiosInstance = requiresAuth ? axiosAuthInstance : axiosPublicInstance;
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT request
  static async put<T>(url: string, data: any, requiresAuth: boolean = true): Promise<T> {
    try {
      const instance: AxiosInstance = requiresAuth ? axiosAuthInstance : axiosPublicInstance;
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE request
  static async delete<T>(url: string, requiresAuth: boolean = true): Promise<T> {
    try {
      const instance: AxiosInstance = requiresAuth ? axiosAuthInstance : axiosPublicInstance;
      const response = await instance.delete(url);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Error handler
  private static handleError(error: any): never {
    // Log error or send to monitoring service
    console.error('API Error:', error);
    
    // You can customize error handling based on status codes
    if (error.response) {
      throw {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.message || 'An error occurred'
      };
    }
    
    throw {
      status: 500,
      message: error.message || 'Network error'
    };
  }
}

export default ApiService;
