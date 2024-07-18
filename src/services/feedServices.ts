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

export const fetchFeeds = async () => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.get('api/feeds', token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const fetchFeedById = async (feedId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.get(`api/feed/${feedId}`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const createFeed = async (title: string, content: string, user_id: string, image: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.post('api/feed', { title, content, user_id, image }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};


export const updateFeed = async (feedId: string, title: string, content: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.put(`api/feed/${feedId}`, { title, content }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteFeed = async (feedId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.delete(`api/feed/${feedId}`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const createCommunityPost = async (communityId: string, title: string, content: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.post('api/feed/community/post', { community_id: communityId, title, content }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const updateCommunityPost = async (postId: string, title: string, content: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.put(`api/feed/community/post/${postId}`, { title, content }, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};

export const deleteCommunityPost = async (postId: string) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Token not found');
        const response = await api.delete(`api/feed/community/post/${postId}`, token);
        return response;
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw apiError;
    }
};
