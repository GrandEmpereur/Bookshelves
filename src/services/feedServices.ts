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

interface ApiError {
    message: string;
    [key: string]: any;
}

export const getToken = async () => {
    const { value } = await Storage.get({ key: 'token' });
    return value;
};

export const fetchFeeds = async (token: string) => {
    try {
        return await api.get('api/feeds', token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const fetchComments = async (feedId: string, token: string) => {
    try {
        return await api.get(`api/feeds/${feedId}/comments`, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const likePost = async (feedId: string, token: string) => {
    try {
        return await api.post(`api/feeds/${feedId}/likes`, {}, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const unlikePost = async (feedId: string, token: string) => {
};
