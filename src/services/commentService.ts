import { Comment, CommentsResponse } from '@/types/comment';
import { apiClient, handleApiError } from './apiClient';

export const getComments = async (postId: string): Promise<CommentsResponse> => {
    try {
        const response = await apiClient.get<CommentsResponse>(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return { data: [] };
};

export const createComment = async (postId: string, commentData: Partial<Comment>): Promise<Comment> => {
    try {
        const response = await apiClient.post<{ data: { comment: Comment } }>(`/posts/${postId}/comments`, commentData);
        return response.data.data.comment;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Comment;
};

export const createReplyComment = async (postId: string, content: Partial<Comment>, commentId: string): Promise<Comment> => {
    try {
        const response = await apiClient.post<{ data: { reply: Comment } }>(`/posts/${postId}/comments/${commentId}/reply`, content);
        return response.data.data.reply;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Comment;
};

export const updateComment = async (id: string, commentData: Partial<Comment>): Promise<Comment> => {
    try {
        const response = await apiClient.put<{ data: { comment: Comment } }>(`/posts/comments/${id}`, commentData);
        return response.data.data.comment;
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