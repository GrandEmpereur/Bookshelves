import axios, { AxiosError } from 'axios';
import { ApiResponse, Post, ApiError } from '@/types/post';
import { Like } from '@/types/like';
import { Comment } from '@/types/comment';
import { Favorite } from '@/types/favorite';


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data.message || 'An unknown error occurred');
    } else {
        throw new Error('An unmanaged error occurred');
    }
};

// Posts
export const getPosts = async (): Promise<ApiResponse<Post[]>> => {
    try {
        const response = await axios.get<ApiResponse<Post[]>>(`${API_URL}/posts`);
        return response.data
    } catch (error) {
        handleApiError(error);
    }
    return { status: 'error', message: 'An error occurred', data: [] };
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
    try {
        const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};

export const createPost = async (formData: FormData): Promise<Post | undefined> => {
    try {
        const response = await axios.post<Post>(`${API_URL}/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // Assurez-vous que les cookies sont envoyés si nécessaire
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};



export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post | undefined> => {
    try {
        const response = await axios.put<Post>(`${API_URL}/posts/${id}`, postData, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};

export const deletePost = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/posts/${id}`, { withCredentials: true });
    } catch (error) {
        handleApiError(error);
    }
};

// Comments
export const getComments = async (postId: string): Promise<Comment[]> => {
    try {
        const response = await axios.get<Comment[]>(`${API_URL}/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return [];
};

export const createComment = async (postId: string, commentData: Partial<Comment>): Promise<Comment | undefined> => {
    try {
        const response = await axios.post<Comment>(`${API_URL}/posts/${postId}/comments`, commentData, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};

export const updateComment = async (id: string, commentData: Partial<Comment>): Promise<Comment | undefined> => {
    try {
        const response = await axios.put<Comment>(`${API_URL}/posts/comments/${id}`, commentData, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};

export const deleteComment = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/posts/comments/${id}`, { withCredentials: true });
    } catch (error) {
        handleApiError(error);
    }
};

// Likes
export const toggleLike = async (postId?: string, commentId?: string): Promise<Like | undefined> => {
    try {
        // Assurez-vous que l'un des IDs est défini et correct
        if (!postId && !commentId) {
            throw new Error('Either postId or commentId must be provided.');
        }

        const response = await axios.post<Like>(
            `${API_URL}/posts/like`,
            { postId, commentId },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};

// Favorites
export const toggleFavorite = async (favoriteData: { postId: string }): Promise<Favorite | undefined> => {
    try {
        const response = await axios.post<Favorite>(`${API_URL}/posts/favorites`, favoriteData, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return undefined;
};
