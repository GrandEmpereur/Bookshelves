"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { getPosts, toggleLike, toggleFavorite } from "@/services/postService";
import { Post } from "@/types/post";
//@ts-ignore
import { DateTime } from "luxon";
import FloatingActionButton from "@/components/FloatingActionButton";

// Function to generate a random fallback image URL
const getRandomImage = (width: number, height: number) =>
    `https://picsum.photos/${width}/${height}?random=${Math.floor(
        Math.random() * 1000
    )}`;

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();
    const avatars = [
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        getRandomImage(40, 40),
    ];

    // Fetch posts data when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                // Sort posts by createdAt in descending order (most recent first)
                const sortedPosts = response.data.sort(
                    (a: Post, b: Post) =>
                        DateTime.fromISO(b.createdAt).toMillis() -
                        DateTime.fromISO(a.createdAt).toMillis()
                );
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // Handle like toggle with animation
    const handleLikeToggle = async (postId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likesCount: post.isLiked
                            ? post.likesCount - 1
                            : post.likesCount + 1,
                    }
                    : post
            )
        );

        try {
            await toggleLike(postId);
        } catch (error) {
            console.error("Error toggling like:", error);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            isLiked: !post.isLiked,
                            likesCount: post.isLiked
                                ? post.likesCount - 1
                                : post.likesCount + 1,
                        }
                        : post
                )
            );
        }
    };

    // Handle favorite toggle with animation
    const handleFavoriteToggle = async (postId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, isFavorited: !post.isFavorited }
                    : post
            )
        );

        try {
            await toggleFavorite({ postId });
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? { ...post, isFavorited: !post.isFavorited }
                        : post
                )
            );
        }
    };

    const formatTimestamp = (createdAt: string): string => {
        const postDate = DateTime.fromISO(createdAt);
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

    // Function to handle the click of the FloatingActionButton
    const handleAddPost = () => {
        router.push("/feed/new-post");
    };

    return (
        <div className="w-full">
            {posts.map((post) => (
                <div key={post.id} className="pt-4 pb-4">
                    {/* Post Header */}
                    <div className="flex items-center mb-4">
                        <Avatar className="mr-4">
                            <AvatarImage
                                src={post.user.profilePicture || getRandomImage(40, 40)}
                                alt={post.user.username || "User Avatar"}
                            />
                            <AvatarFallback>
                                {post.user.username.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-2">
                                <span className="font-bold">{post.user.username || "User"}</span>
                                <span className="text-gray-500 text-sm mt-1">
                                    {formatTimestamp(post.createdAt)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{post.title}</p>
                        </div>
                        <div className="flex items-center -space-x-3">
                            {avatars.slice(0, 3).map((src, index) => (
                                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                                    <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            ))}
                            {avatars.length > 3 && (
                                <Avatar className="w-8 h-8 border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold">
                                    +{avatars.length - 3}
                                </Avatar>
                            )}
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                        <p className="text-gray-800 mb-4 break-words">{post.content}</p>
                        {post.media && post.media.length > 0 ? (
                            <div className="overflow-hidden rounded-md">
                                <img
                                    src={post.media[0].url}
                                    alt="Post content"
                                    className="object-cover w-full h-auto"
                                />
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-md">
                                <img
                                    src={getRandomImage(600, 400)}
                                    alt="Post content"
                                    className="object-cover w-full h-auto"
                                />
                            </div>
                        )}
                    </div>

                    {/* Post Footer */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Button
                                variant="icon"
                                size="sm"
                                onClick={() => handleLikeToggle(post.id)}
                                className="transition-all duration-300 ease-in-out transform"
                            >
                                <Heart
                                    className={`transition-all duration-300 ease-in-out ${post.isLiked ? "text-red-500" : "text-primary"
                                        }`}
                                    style={{
                                        fill: post.isLiked ? "red" : "transparent",
                                    }}
                                />
                                <span className="text-sm ml-1 transition-all duration-300 ease-in-out">
                                    {post.likesCount}
                                </span>
                            </Button>
                            <Button variant="icon" size="sm">
                                <MessageSquare className="text-primary" />
                                <span className="text-sm ml-1">{post.commentsCount}</span>
                            </Button>
                            <Button
                                variant="icon"
                                size="sm"
                                onClick={() => handleFavoriteToggle(post.id)}
                            >
                                <Bookmark
                                    className={`transition-all duration-300 ease-in-out text-primary `}
                                    style={{
                                        fill: post.isFavorited ? "#ffb86a" : "transparent",
                                    }}
                                />
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-4" />

                </div>
            ))}

            <FloatingActionButton onClick={handleAddPost} />
        </div>
    );
};

export default Feed;
