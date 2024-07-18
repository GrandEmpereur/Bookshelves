import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

const baseURL = "https://bookish.empereur.me/";

const api = {
    async post(url: string, data: any, token?: string) {
        const options: HttpOptions = {
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            data,
        };
        const response = await CapacitorHttp.post(options);
        return response.data;
    },
    async get(url: string, token?: string) {
        const options: HttpOptions = {
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
    },
};

export const setToken = async (token: string) => {
    await Storage.set({ key: 'token', value: token });
};

export const setRefreshToken = async (refreshToken: string) => {
    await Storage.set({ key: 'refresh_token', value: refreshToken });
};

export const getToken = async () => {
    const { value } = await Storage.get({ key: 'token' });
    return value;
};

export const getRefreshToken = async () => {
    const { value } = await Storage.get({ key: 'refresh_token' });
    return value;
};

export const clearTokens = async () => {
    await Storage.remove({ key: 'token' });
    await Storage.remove({ key: 'refresh_token' });
};

interface ApiError {
    message: string;
    [key: string]: any;
}

export const register = async (username: string, email: string, password: string, role?: string) => {
    try {
        const response = await api.post('auth/register', { username, email, password, role });
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('auth/login', { email, password });
        await setToken(response.token);
        await setRefreshToken(response.refresh_token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const logout = async () => {
    try {
        const token = await getToken();
        await api.post('auth/logout', {}, token!);
        await clearTokens();
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const getCurrentUser = async () => {
    try {
        const token = await getToken();
        const response = await api.get('auth/me', token!);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const verifyEmail = async (email: string, code: string) => {
    try {
        const response = await api.post('auth/verify-email', { email, code });
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await api.post('auth/forgot-password', { email });
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const verifyResetToken = async (token: string) => {
    try {
        const response = await api.post('auth/verify-reset-token', { token });
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const resetPassword = async (userId: string, newPassword: string) => {
    try {
        const response = await api.post('auth/reset-password', { userId, newPassword });
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const refreshToken = async () => {
    try {
        const refreshToken = await getRefreshToken();
        const response = await api.post('auth/refresh-token', { refresh_token: refreshToken });
        await setToken(response.token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};
