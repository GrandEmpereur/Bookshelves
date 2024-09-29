import { User } from './user';
import { Post } from './post';

export interface Like {
    id: string;
    userId: string;
    postId: string | null;
    commentId: string | null;
    likesCount: string;
    user: User;
    post: Post | null;
    createdAt: string;
    updatedAt: string;
}
