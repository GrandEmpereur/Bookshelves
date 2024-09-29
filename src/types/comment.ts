import { User } from './user';
import { Post } from './post';
import { Like } from './like';

export interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentCommentId: string | null;
    post: Post;
    user: User;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    replies: Comment[];
    repliesCount: number;
    likes: any[];
    isLiked: boolean; // Ajout de la propriété isLiked
}

export interface CommentsResponse {
    data: Comment[];
}
