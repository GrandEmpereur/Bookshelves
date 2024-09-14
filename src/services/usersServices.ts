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

export const CurrentUser = async (): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_URL}/user/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as User;
    }
};
