import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { getToken } from './authServices';

const baseURL = "https://bookish.empereur.me/";

const api = {
    async post(url: string, token?: string) {
        const options: HttpOptions = {
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
        const response = await CapacitorHttp.post(options);
        return response.data;
    },
    async delete(url: string, token?: string) {
        const options: HttpOptions = {
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
        const response = await CapacitorHttp.delete(options);
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
    }
};

interface ApiError {
    message: string;
    [key: string]: any;
}

export const likeFeed = async (feedId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.post(`api/feeds/${feedId}/likes`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const unlikeFeed = async (feedId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.delete(`api/feeds/${feedId}/likes`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const fetchLikedPosts = async () => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.get('api/feeds/likes/posts', token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};