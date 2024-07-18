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
};

interface ApiError {
    message: string;
    [key: string]: any;
}

export const getToken = async () => {
    const { value } = await Storage.get({ key: 'token' });
    return value;
};

export const fetchComments = async (feedId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.get(`api/feeds/${feedId}/comments`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const createComment = async (feedId: string, content: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.post(`api/feeds/${feedId}/comments`, { content, post_id: feedId }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const updateComment = async (feedId: string, commentId: string, content: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.put(`api/feeds/${feedId}/comments/${commentId}`, { content }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteComment = async (feedId: string, commentId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.delete(`api/feeds/${feedId}/comments/${commentId}`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};
