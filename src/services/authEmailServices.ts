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

export const EmailVerify = async (email: string, code: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/email/verify`,
            { email, code },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
}

export const ResendVerificationEmail = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/email/resend`,
            { email },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
}

export const ForgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/password/forgot`,
            { email },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
}

export const PasswordVerify = async (email: string, otp: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/email/verify-reset`,
            { email, otp },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
}

export const ResetPassword = async (userId: string, newPassword: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/password/reset`,
            { userId, newPassword },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
        return {} as AuthResponse;
    }
}



