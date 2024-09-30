import { Comment } from './comment';
import { Like } from './like';
import { Favorite } from './favorite';
import { Media } from './media';

export interface Post {
    id: string;
    user: {
        profile_picture: string;
        username: string;
    };
    createdAt: string;
    title: string;
    subject: string;
    content: string;
    isLiked: boolean;
    likesCount: number;
    isFavorited: boolean;
    favoritesCount: number;
    commentsCount: number;
    comments: Comment[];
    likes: Like[];
    favorites: Favorite[];
    media: Media[];
}

export interface PostResponse {
    status: string;
    data: Post;
}

export interface PostsResponse {
    status: string;
    data: Post[];
}
