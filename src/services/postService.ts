import { Post } from '@/types/post';
import { Comment } from '@/types/comment';
import { apiClient, handleApiError } from './apiClient';
import { PostsResponse } from "@/types/post";

export const getPosts = async (): Promise<PostsResponse> => {
    try {
        const response = await apiClient.get<PostsResponse>('/posts');
        return response.data;
    } catch (error) {
        handleApiError(error);
        return { data: [] };
    }
};

export const getPostById = async (id: string): Promise<Post> => {
    try {
        const response = await apiClient.get<Post>(`/posts/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Post;
};

export const getComments = async (postId: string): Promise<Comment[]> => {
    try {
        const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return [];
};

export const createPost = async (formData: FormData): Promise<Post> => {
    try {
        const response = await apiClient.post<Post>('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Post;
};

export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post> => {
    try {
        const response = await apiClient.put<Post>(`/posts/${id}`, postData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return {} as Post;
};
