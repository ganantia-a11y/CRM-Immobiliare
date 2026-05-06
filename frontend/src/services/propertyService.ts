import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const propertyService = {
  async getProperties(filters: any) {
    try {
      const response = await apiClient.get('/properties', { params: filters });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      throw error;
    }
  },

  async getPropertyDetail(id: string) {
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch property:', error);
      throw error;
    }
  },

  async createProperty(data: any) {
    try {
      const response = await apiClient.post('/properties', data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create property:', error);
      throw error;
    }
  },

  async updateProperty(id: string, data: any) {
    try {
      const response = await apiClient.put(`/properties/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update property:', error);
      throw error;
    }
  },

  async deleteProperty(id: string) {
    try {
      await apiClient.delete(`/properties/${id}`);
    } catch (error) {
      console.error('Failed to delete property:', error);
      throw error;
    }
  }
};
