import { Comment } from '@/types/comment';
import { apiClient, handleApiError } from './apiClient';

export const getComments = async (postId: string): Promise<Comment[]> => {
    try {
        const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return [];
};

export const createComment = async (postId: string, commentData: Partial<Comment>): Promise<Comment> => {
    try {
        const response = await apiClient.post<Comment>(`/posts/${postId}/comments`, commentData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Comment;
};

export const updateComment = async (id: string, commentData: Partial<Comment>): Promise<Comment> => {
    try {
        const response = await apiClient.put<Comment>(`/posts/comments/${id}`, commentData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Comment;
};

export const deleteComment = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/posts/comments/${id}`);
    } catch (error) {
        handleApiError(error);
    }
};