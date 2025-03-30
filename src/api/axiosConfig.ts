import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store';

const BASE_URL = 'https://api.example.com';

// Create two axios instances - one for authenticated requests, one for public requests
const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const axiosPublicInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for authenticated requests
axiosAuthInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Get auth token from Redux store
    const state = store.getState();
    const token = state.auth?.user?.token;
    
    // Add auth token to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Common response interceptor function
const responseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      // You can transform the response data here if needed
      return response;
    },
    async (error: AxiosError): Promise<any> => {
      // Handle error responses
      if (error.response?.status === 401 && instance === axiosAuthInstance) {
        // Handle token expiration for authenticated requests only
        // You could implement token refresh logic here
        // Or dispatch logout action
        // store.dispatch(logout());
      }
      
      // Handle other error statuses
      if (error.response?.status === 500) {
        console.error('Server error:', error.response.data);
      }
      
      return Promise.reject(error);
    }
  );
};

// Apply response interceptor to both instances
responseInterceptor(axiosAuthInstance);
responseInterceptor(axiosPublicInstance);

export { axiosAuthInstance, axiosPublicInstance };
