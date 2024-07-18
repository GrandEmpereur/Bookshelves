import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

const baseURL = "https://bookish.empereur.me/";

const api = {
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
    async put(url: string, data: any, token?: string) {
        const options: HttpOptions = {
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            data,
        };
        const response = await CapacitorHttp.put(options);
        return response.data;
    },
};

interface ApiError {
    message: string;
    [key: string]: any;
}

export const getToken = async () => {
    const { value } = await Storage.get({ key: 'token' });
    return value;
};

export const getProfile = async () => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');

        const response = await api.get('api/user/profile', token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const updateProfile = async (profileData: any) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');

        const response = await api.put('api/user/profile', profileData, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};
