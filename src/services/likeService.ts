import { Like } from '@/types/like';
import { apiClient, handleApiError } from './apiClient';

export const togglePostLike = async (postId?: string): Promise<Like> => {
    try {
        if (!postId) {
            throw new Error('Either postId or commentId must be provided.');
        }
        const response = await apiClient.post<Like>('/like/post', { postId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Like;
};

export const toggleCommentLike = async ( commentId?: string): Promise<Like> => {
    try {
        if (!commentId) {
            throw new Error('Either postId or commentId must be provided.');
        }
        const response = await apiClient.post<Like>('/like/comment', { commentId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Like;
};