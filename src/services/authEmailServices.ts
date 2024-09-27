import { AuthResponse } from '@/types/auth';
import { apiClient, handleApiError } from './apiClient';

export const EmailVerify = async (email: string, code: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/email/verify', { email, code });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}

export const ResendVerificationEmail = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/email/resend', { email });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}

export const ForgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/email/forgot-password', { email });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}

export const PasswordVerify = async (email: string, otp: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/email/verify-reset', { email, otp });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}

export const ResetPassword = async (email: string, newPassword: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/email/reset-password', { email, newPassword });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as AuthResponse;
}



