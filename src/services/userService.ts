import { User, UserResponse } from '@/types/user';
import { apiClient, handleApiError } from './apiClient';

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await apiClient.get<UserResponse>('/users/profile');
        return response.data.data[0];
    } catch (error) {
        handleApiError(error);
    }
    return {} as User;
};

export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await apiClient.get<User>(`/users/user/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as User;
};