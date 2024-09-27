import { Like } from '@/types/like';
import { apiClient, handleApiError } from './apiClient';

export const toggleLike = async (postId?: string, commentId?: string): Promise<Like> => {
    try {
        if (!postId && !commentId) {
            throw new Error('Either postId or commentId must be provided.');
        }
        const response = await apiClient.post<Like>('/posts/like', { postId, commentId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Like;
};