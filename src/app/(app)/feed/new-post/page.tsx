"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { createPost } from "@/services/postService";
import { CurrentUser } from "@/services/usersServices";

// Validation schema using zod
const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis."),
    subject: z.string().min(1, "Le sujet est requis."),
    content: z.string().min(1, "Le contenu est requis."),
    media: z.any().optional(), // Media is optional
});

const NewPost: React.FC = () => {
    const router = useRouter();
    const [media, setMedia] = useState<File | null>(null); // To handle the uploaded file
    const [user, setUser] = useState<any | null>(null); // Current user state

    // Fetch current user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await CurrentUser(); // Fetch current user data
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    // Initialize form with react-hook-form and zod validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subject: "",
            content: "",
            media: null,
        },
    });

    // Handle form submission
    const handlePostSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Create a FormData object to send the file
            const formData = new FormData();

            // Append text fields to the FormData
            formData.append("title", values.title);
            formData.append("subject", values.subject);
            formData.append("content", values.content);

            // Append media file if it exists
            if (media) {
                formData.append("media", media); // Append 'media' file
            }

            // Send the form data through the post service
            await createPost(formData);

            // Redirect to the feed after post creation
            router.push("/feed");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error creating the post.");
        }
    };

    // Handle media input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setMedia(event.target.files[0]); // Set the selected media file
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* User Info */}
            <div className="flex items-center mb-4">
                <Avatar className="mr-4">
                    {user?.data.profile_picture ? (
                        <AvatarImage src={user?.data.profile_picture} alt={user?.data.username || "User"} />
                    ) : (
                        <AvatarFallback>{user?.data.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    )}
                </Avatar>
                <div className="flex-1">
                    <p className="font-bold">{user?.data.username || "User"}</p>
                    <span className="text-gray-500 text-sm">{user ? "Online" : "Offline"}</span>
                </div>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePostSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Post title" className="text-[16px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Post subject" className="text-[16px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write something..." className="text-[16px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Add Image or Video</FormLabel>
                        <FormControl className="h-[50px]">
                            <Input
                                type="file"
                                accept="image/*,video/*" // Allow image or video file
                                className="file:mr-5 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white bg-white"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </FormItem>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground py-3">
                        Publish
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default NewPost;
