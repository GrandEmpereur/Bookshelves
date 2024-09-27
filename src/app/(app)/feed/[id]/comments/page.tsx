import React from 'react';
import { getPostById, getComments, getPosts } from '@/services/postService'; // Ajout de getPosts
import { Post } from '@/types/post';
import { Comment } from '@/types/comment';
import { notFound } from 'next/navigation';

interface CommentsPageProps {
    params: {
        id: string;
    };
}

const CommentsPage: React.FC<CommentsPageProps> = async ({ params }) => {
    const id = params.id;

    // Fetch post details
    const post = await getPostById(id);
    if (!post) {
        return notFound(); // Return 404 if post not found
    }

    // Fetch comments for the post
    const comments = await getComments(id);

    return (
        <div className="comments-page">
            {/* Post Information */}
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            {/* Comments Section */}
            <h2>Comments</h2>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment: Comment) => (
                        <li key={comment.id}>
                            <strong>{comment.user?.username}:</strong> {comment.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.data.map((post: Post) => ({
        id: post.id,
    }));
}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    // Votre logique pour afficher les commentaires du post avec l'ID `id`
    return <div>Commentaires pour le post {id}</div>;
}
