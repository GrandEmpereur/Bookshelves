'use client';

import React, { useEffect, useState } from 'react';
import { getPostById } from '@/services/postService';
import { getComments, createComment, createReplyComment } from '@/services/commentService';
import { toggleCommentLike } from '@/services/likeService';
import { Comment } from '@/types/comment';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartIcon, MessageCircleIcon, SendIcon, ImageIcon, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Post } from '@/types';
//@ts-ignore
import { DateTime } from 'luxon';

interface CommentSectionProps {
    postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [replyTo, setReplyTo] = useState<Comment | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch post details
                const postResponse = await getPostById(postId);
                setPost(postResponse.data);

                // Fetch comments for the post
                const commentsResponse = await getComments(postId);
                if (commentsResponse) {
                    setComments(commentsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]);

    const formatDate = (dateString: string) => {
        const postDate = DateTime.fromISO(dateString);
        const now = DateTime.now();
        const diffInSeconds = now.diff(postDate, "seconds").seconds;

        if (diffInSeconds < 60) {
            return `${Math.floor(diffInSeconds)}s`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)}m`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)}h`;
        } else if (diffInSeconds < 604800) {
            return `il y a ${Math.floor(diffInSeconds / 86400)}j`;
        } else {
            return postDate.toFormat("dd/MM/yyyy");
        }
    };

    if (loading) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                        <Skeleton className="w-24 h-4 mb-1" />
                        <Skeleton className="w-16 h-3" />
                    </div>
                </div>
                <Skeleton className="w-full h-5 mt-2" />
                <Skeleton className="w-full h-5 mt-2" />
                <Skeleton className="w-full h-5 mt-2" />
                <Skeleton className="w-full h-12 mt-4" />
            </div>
        );
    }

    const handleLikeToggle = async (commentId: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        isLiked: !comment.isLiked,
                        likesCount: comment.isLiked
                            ? comment.likesCount - 1
                            : comment.likesCount + 1,
                    }
                    : comment
            )
        );

        try {
            await toggleCommentLike(commentId);
        } catch (error) {
            console.error("Error toggling like:", error);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            isLiked: !comment.isLiked,
                            likesCount: comment.isLiked
                                ? comment.likesCount - 1
                                : comment.likesCount + 1,
                        }
                        : comment
                )
            );
        }
    };

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await createComment(postId, { content: newComment });

            if (response && response.id) {
                setComments([response, ...comments]); // Ajouter le nouveau commentaire en premier
                setNewComment(''); // Réinitialiser l'input du commentaire
            } else {
                throw new Error("La réponse du serveur est invalide.");
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleReplyClick = (comment: Comment) => {
        setReplyTo(comment);
    };

    const handleReplySubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!replyTo) return;
        try {
            const response = await createReplyComment(postId, { content: newReply }, replyTo.id);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === replyTo.id
                        ? {
                            ...comment,
                            replies: [response, ...comment.replies], // Ajouter la nouvelle réponse en premier
                            repliesCount: comment.repliesCount + 1,
                        }
                        : comment
                )
            );
            setNewReply('');
            setReplyTo(null);
        } catch (error) {
            console.error('Error creating reply:', error);
        }
    };

    const handleResetReply = () => {
        setReplyTo(null);
        setNewReply('');
    };

    return (
        <div className="w-full relative">
            <div className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={post?.user.profile_picture || '/placeholder.svg'} alt={post?.user.username || 'User'} />
                    <AvatarFallback>{post?.user.username ? post.user.username[0] : 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-semibold">{post?.user.username}</h2>
                        <p className="text-sm text-gray-500 mt-[2px]">{post && formatDate(post.createdAt)}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{post?.subject}</p>
                </div>
            </div>

            <p className="text-sm mt-2">{post?.content}</p>

            <div>
                <div className='flex flex-col gapy-2 items-center justify-center pt-5 pb-5'>
                    <span className="flex w-[65px] h-[2px] bg-black rounded-full"></span>
                    <h2 className="font-semibold text-xl">Commentaires</h2>
                </div>

                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex flex-col mb-4 px-5">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={comment.user?.profile_picture || '/placeholder.svg?height=40&width=40'} alt={comment.user?.username || 'User'} />
                                    <AvatarFallback>{comment.user?.username ? comment.user.username[0] : 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-x-3">
                                        <h4 className="font-semibold">{comment.user?.username}</h4>
                                        <span className="text-xs text-gray-500 mt-[2px]">{formatDate(comment.createdAt)}</span>
                                    </div>
                                    <p className="text-sm mt-1">{comment.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Button
                                            variant="icon"
                                            size="sm"
                                            onClick={() => handleLikeToggle(comment.id)}
                                            className="transition-all duration-300 ease-in-out transform"
                                        >
                                            <Heart
                                                className={`w-4 h-4 transition-all duration-300 ease-in-out ${comment.isLiked ? "text-red-500" : "text-primary"
                                                    }`}
                                                style={{
                                                    fill: comment.isLiked ? "red" : "transparent",
                                                }}
                                            />
                                            <span className="text-sm ml-1 transition-all duration-300 ease-in-out">
                                                {comment.likesCount}
                                            </span>
                                        </Button>
                                        
                                        <Button variant="ghost" size="sm" onClick={() => handleReplyClick(comment)}>
                                            <MessageCircleIcon className="w-4 h-4 mr-1" />
                                            Reply ({comment.repliesCount})
                                        </Button>
                                    </div>
                                    {comment.repliesCount > 0 && (
                                        <Accordion type="single" collapsible className="mt-2">
                                            <AccordionItem value="replies">
                                                <AccordionTrigger>Voir les réponses ({comment.repliesCount})</AccordionTrigger>
                                                <AccordionContent>
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.id} className="flex items-start gap-4 mb-4 mt-2">
                                                            <Avatar>
                                                                <AvatarImage src={reply.user?.profile_picture || '/placeholder.svg?height=40&width=40'} alt={reply.user?.username || 'User'} />
                                                                <AvatarFallback>{reply.user?.username ? reply.user.username[0] : 'U'}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-x-3">
                                                                    <h4 className="font-semibold">{reply.user?.username}</h4>
                                                                    <span className="text-xs text-gray-500 mt-[2px]">{formatDate(reply.createdAt)}</span>
                                                                </div>
                                                                <p className="text-sm mt-1">{reply.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Aucun commentaire pour l'instant.</p>
                )}
            </div>

            <div className="mt-10">
                {replyTo && (
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Répondre à : {replyTo.user?.username}</p>
                        <Button variant="link" onClick={handleResetReply}>Annuler la réponse</Button>
                    </div>
                )}
                <form onSubmit={replyTo ? handleReplySubmit : handleCommentSubmit} className="flex items-center w-full gap-2 mt-4">
                    <Input
                        className="flex-1"
                        placeholder={replyTo ? "Écrivez une réponse..." : "Écrivez un commentaire..."}
                        value={replyTo ? newReply : newComment}
                        onChange={(e) => replyTo ? setNewReply(e.target.value) : setNewComment(e.target.value)}
                    />
                    <Button size="icon" variant="icon">
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button type="submit" size="icon">
                        <SendIcon className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
        
    );
};

export default CommentSection;