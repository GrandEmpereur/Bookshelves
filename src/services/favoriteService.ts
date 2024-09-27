import { Favorite } from '@/types/favorite';
import { apiClient, handleApiError } from './apiClient';

export const toggleFavorite = async (postId: string): Promise<Favorite> => {
    try {
        const response = await apiClient.post<Favorite>('/posts/favorites', { postId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Favorite;
};