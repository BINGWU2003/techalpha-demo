import api from './api';

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface User {
  id: string | number;
  username: string;
  email?: string;
  [key: string]: any;
}

export const authService = {
  /**
   * Login user with session authentication
   */
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },

  /**
   * Get current authenticated user details
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    return response.data;
  }
};
