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

export const fetchLists = async () => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.get('api/lists', token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const createList = async (title: string, description: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.post('api/list', { title, description }, token);
        console.log('Created list:', response);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const updateList = async (listId: string, title: string, description: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.put(`api/list/${listId}`, { title, description }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteList = async (listId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.delete(`api/list/${listId}`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};