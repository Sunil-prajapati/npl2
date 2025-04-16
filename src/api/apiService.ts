import { axiosAuthInstance, axiosPublicInstance } from './axiosConfig';
import { AxiosInstance } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

// Generic API service with common methods
class ApiService {
  // Check network before making request
  static async checkNetwork() {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        text2: 'Please check your network settings',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: false,
      });
      throw new Error('No internet connection');
    }
  }

  // GET request
  static async get<T>(url: string, params?: any, requiresAuth: boolean = true): Promise<T> {
    try {
      await this.checkNetwork();
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
      await this.checkNetwork();
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
    // Network error
    if (error.message === 'No internet connection') {
      throw {
        status: 'NETWORK_ERROR',
        message: 'No internet connection'
      };
    }
    
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

