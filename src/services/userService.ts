import { User, UserResponse } from '@/types/user';
import { apiClient, handleApiError } from './apiClient';
import axios from "axios";
import { ProfileSchema } from "@/schemas/profileSchema";

export const getCurrentUser = async (): Promise<UserResponse> => {
    try {
        const response = await apiClient.get<UserResponse>('/users/profile');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {
        status: 'error',
        data: {} as User
    };
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

export const updateProfile = async (data: ProfileSchema) => {
    const response = await axios.put("/api/profile", data);
    return response.data;
};

export const deleteUser = async () => {
    const response = await axios.delete("/api/profile");
    return response.data;
};