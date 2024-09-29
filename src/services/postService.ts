import { Post } from '@/types/post';
import { apiClient, handleApiError } from './apiClient';
import { PostsResponse } from "@/types/post";
import { PostResponse } from "@/types/post";

export const getPosts = async (): Promise<PostsResponse> => {
    try {
        const response = await apiClient.get<PostsResponse>('/posts');
        return response.data;
    } catch (error) {
        handleApiError(error);
        return { data: [] };
    }
};

export const getPostById = async (postId: string): Promise<PostResponse> => {
    try {
        const response = await apiClient.get<PostResponse>(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
    return { data: {} as Post };
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
