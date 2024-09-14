// services/authService.ts

import axios, { AxiosError } from 'axios';
import { AuthResponse, ApiError, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Fonction de gestion des erreurs pour les appels API
const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data.message);
    } else {
        throw new Error('Une erreur non gérée est survenue');
    }
};

export const UpdateUserPreferencesGenres = async (email: string, genres: string[]): Promise<AuthResponse> => {
    try {
        const response = await axios.put<AuthResponse>(`${API_URL}/users/preferences/genres`, { email, genres });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse; // Assure le typage correct
    }
}

export const UpdateUserPreferences = async (email: string, readingHabit: string, usagePurpose: string): Promise<AuthResponse> => {
    try {
        const response = await axios.put<AuthResponse>(`${API_URL}/users/preferences`, { email, readingHabit, usagePurpose });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse; // Assure le typage correct
    }
}
