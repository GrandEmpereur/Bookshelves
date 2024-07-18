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

export const fetchFeeds = async (token: string) => {
    try {

        const test = await api.get('api/feeds', token);
        console.log('test', test);
        return test;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const fetchFeedById = async (feedId: string, token: string) => {
    try {
        return await api.get(`api/feed/${feedId}`, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const likeStatus = async (feedId: string, token: string) => {
    try {
        return await api.get(`api/feeds/${feedId}/likes`, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteFeed = async (feedId: string, token: string) => {
    try {
        return await api.delete(`api/feed/${feedId}`, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const saveFeed = async (feedId: string, title: string, content: string, token: string) => {
    try {
        return await api.put(`api/feed/${feedId}`, { title, content }, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const createNewFeed = async (newFeed: { title: string; content: string; user_id: string }, token: string) => {
    try {
        return await api.post('api/feed', newFeed, token);
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
    try {
        return await api.delete(`api/feeds/${feedId}/likes`, token);
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

export const addComment = async (feedId: string, content: string, token: string) => {
    try {
        return await api.post(`api/feeds/${feedId}/comments`, { content }, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteComment = async (feedId: string, commentId: string, token: string) => {
    try {
        return await api.delete(`api/feeds/${feedId}/comments/${commentId}`, token);
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};
