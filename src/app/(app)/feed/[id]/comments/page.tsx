import React from 'react';
import { getPosts } from '@/services/postService'; // Ajout de getPosts
import { Post } from '@/types/post';
import CommentSection from '@/components/client/CommentSection';

interface CommentsPageProps {
    params: {
        id: string;
    };
}

const CommentsPage: React.FC<CommentsPageProps> = async ({ params }) => {
    const id = params.id;

    return (
        <div className="comments-page">
            <CommentSection postId={id} />
        </div>
    );
};

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.data.map((post: Post) => ({
        id: post.id,
    }));
}

export default CommentsPage;
