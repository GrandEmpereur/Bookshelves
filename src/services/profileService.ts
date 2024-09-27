import { AuthResponse } from '@/types/auth';
import { apiClient, handleApiError } from './apiClient';

export const UpdateUserPreferencesGenres = async (email: string, genres: string[]): Promise<AuthResponse> => {
    try {
        const response = await apiClient.put<AuthResponse>('/users/preferences/genres', { email, genres });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}

export const UpdateUserPreferences = async (email: string, readingHabit: string, usagePurpose: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.put<AuthResponse>('/users/preferences', { email, readingHabit, usagePurpose });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}
