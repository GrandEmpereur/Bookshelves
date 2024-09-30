import { AuthResponse } from '@/types/auth';
import { User } from '@/types/user';
import { apiClient, handleApiError } from './apiClient';

export const login = async (email: string, password: string, remember_me: boolean): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/login', { email, password, remember_me });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
};

export const register = async (userData: Partial<User>): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/register', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
};

export const logout = async (): Promise<void> => {
    try {
        await apiClient.delete('/auth/logout');
    } catch (error) {
        handleApiError(error);
    }
};

export const getCurrentSession = async (): Promise<AuthResponse> => {
    try {
        const response = await apiClient.get<AuthResponse>('/auth/session');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
};
