import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookish.empereur.me/',
});

interface ApiError {
  message: string;
  [key: string]: any;
}

export const register = async (username: string, email: string, password: string, role?: string) => {
  try {
    const response = await api.post('/auth/register', { username, email, password, role });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: { message: string } } };
    throw apiError;
  }
};


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw apiError;
  }
};

export const logout = async (token: string) => {
  try {
    const response = await api.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw apiError;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw apiError;
  }
};

export const verifyEmail = async (email: string, code: string) => {
  try {
    const response = await api.post('/auth/verify-email', { email, code });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: { message: string } } };
    throw apiError;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: { message: string } } };
    throw apiError;
  }
};

export const verifyResetToken = async (token: string) => {
  try {
    const response = await api.post('/auth/verify-reset-token', { token });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: { message: string } } };
    throw apiError;
  }
};

export const resetPassword = async (userId: string, newPassword: string) => {
  try {
    const response = await api.post('/auth/reset-password', { userId, newPassword });
    return response.data;
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: { message: string } } };
    throw apiError;
  }
};

