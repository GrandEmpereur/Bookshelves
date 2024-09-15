"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageSquare, Bookmark } from "lucide-react";

// Function to generate random image URLs
const getRandomImage = (width: number, height: number) =>
    `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;

const Feed = () => {
    // Sample data for avatars
    const avatars = [
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        getRandomImage(40, 40),
        // Uncomment the line below to see the "+x" effect
        // getRandomImage(40, 40),
    ];

    return (
        <div className="w-full ">
            {/* Post Header */}
            <div className="flex items-center mb-4">
                <Avatar className="mr-4">
                    <AvatarImage src={getRandomImage(40, 40)} alt="User Avatar" />
                    <AvatarFallback>LN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">Leonardo</span>
                        <span className="text-gray-500 text-sm">16h</span>
                    </div>
                    <p className="text-sm text-gray-500">A Game of Thrones</p>
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
                <p className="text-gray-800 mb-4">
                    Je viens de terminer "Game of Thrones" de George R.R. Martin et wow, quelle aventure épique
                </p>

                {/* Post Image */}
                <div className="overflow-hidden rounded-md">
                    <img
                        src={getRandomImage(600, 400)}
                        alt="Post content"
                        className="object-cover w-full h-auto"
                    />
                </div>
            </div>

            <Separator className="my-4" />

            {/* Post Footer */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button variant="icon" size="icon">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm ml-1">44</span>
                    </Button>
                    <Button variant="icon" size="icon">
                        <MessageSquare className="w-5 h-5 text-gray-500" />
                        <span className="text-sm ml-1">6</span>
                    </Button>
                    <Button variant="icon" size="icon">
                        <Bookmark className="w-5 h-5 text-gray-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Feed;
