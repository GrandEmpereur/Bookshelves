export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface Media {
    id: string;
    url: string;
    type: 'image' | 'video';
    postId: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    profilePicture: string | null;
}

export interface Post {
    id: string;
    title: string;
    subject: string;
    content: string;
    userId: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    user: User;
    media: Media[];
    isLiked: boolean;
    isFavorited: boolean;
}

export interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentCommentId?: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    id: string;
    userId: string;
    postId?: string;
    commentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Favorite {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiError {
    message: string;
    code?: string;
}
