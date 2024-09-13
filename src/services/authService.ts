// services/authService.ts

import axios, { AxiosError } from 'axios';
import { AuthResponse, ApiError, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Fonction de gestion des erreurs pour les appels API
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
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        handleApiError(error);
        // Ajouter un return pour satisfaire le typage même si ce code ne devrait jamais être atteint
        return {} as AuthResponse; // Cette ligne ne sera jamais exécutée mais est nécessaire pour le typage
    }
};

export const register = async (userData: Partial<User>): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse; // Assure le typage correct
    }
};

export const resendVerificationEmail = async (email: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post<{ message: string }>(`${API_URL}/auth/resend-verification-email`, { email });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return { message: 'Une erreur est survenue' };
    }
}

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post<{ message: string }>(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return { message: 'Une erreur est survenue' }; // Retour par défaut pour satisfaire le typage
    }
};

export const emailVerificationOtp = async (email: string, code: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post<{ message: string }>(`${API_URL}/auth/verify-email`, { email, code });
        console.log(response);
        return response.data;
    } catch (error) {
        handleApiError(error);
        return { message: 'Une erreur est survenue' }; // Retour par défaut
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
        handleApiError(error);
    }
};
