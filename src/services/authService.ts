// services/authService.ts

import axios, { AxiosError } from 'axios';
import { AuthResponse, ApiError, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data.message || 'Une erreur inconnue est survenue');
    } else {
        throw new Error('Une erreur non gérée est survenue');
    }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/login`,
            { email, password },
            { withCredentials: true } // Important pour la gestion des cookies de session
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
};

export const register = async (userData: Partial<User>): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/register`,
            userData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/auth/logout`, { withCredentials: true });
    } catch (error) {
        handleApiError(error);
    }
};

export const CurrentSession = async (): Promise<AuthResponse> => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/session`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
};
