// app/(main)/feed/[feedId]/commentaire/CommentsClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchComments } from '@/services/feedServices';
import { getToken } from '@/services/authentication';

const CommentsClient: React.FC = () => {
    const { feedId } = useParams<{ feedId: string }>();
    const [comments, setComments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                const data = await fetchComments(feedId, token!);
                setComments(data);
            } catch (err) {
                setError("Error fetching comments");
            }
        };
        fetchData();
    }, [feedId]);

    return (
        <div className="flex flex-col items-center w-full h-screen bg-primary p-4">
            {error && <div className="text-red-500">{error}</div>}
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.commentId} className="bg-white p-4 rounded shadow-md mb-4 w-full max-w-md">
                        <p>{comment.content}</p>
                    </div>
                ))
            ) : (
                <div>No comments available</div>
            )}
        </div>
    );
};

export default CommentsClient;
