"use client";

import React, { useState } from "react";
import { getToken } from "@/services/feedServices";

interface Comment {
    id: string;
    text: string;
    author: string;
}

interface CommentsClientProps {
    initialComments: Comment[];
    postId: string;
}

const CommentsClient: React.FC<CommentsClientProps> = ({ initialComments, postId }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [error, setError] = useState<string | null>(null);
    const [newComment, setNewComment] = useState<string>('');

    const handleAddComment = async () => {
        const token = await getToken();
        try {
            const response = await fetch(`https://bookish.empereur.me/api/feeds/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text: newComment }),
            });
            if (!response.ok) {
                throw new Error('Error adding comment');
            }
            const comment = await response.json();
            setComments([...comments, comment]);
            setNewComment('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 px-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <h1>Comments for Post {postId}</h1>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <p><i>By {comment.author}</i></p>
                        </li>
                    ))}
                </ul>
                <div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
            </div>
        </div>
    );
};

export default CommentsClient;
