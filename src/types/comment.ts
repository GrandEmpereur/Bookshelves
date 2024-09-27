import { User } from './user';
import { Post } from './post';
import { Like } from './like';

export interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentCommentId: string | null;
    likesCount: number;
    user: User;
    post: Post;
    replies: Comment[];
    likes: Like[];
    createdAt: string;
    updatedAt: string;
}
