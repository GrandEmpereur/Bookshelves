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
import { Media } from "@/types/post";
import { CurrentUser } from "@/services/usersServices";
import { User } from "@/types/user";

// Validation schema using zod
const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis."),
    subject: z.string().min(1, "Le sujet est requis."),
    content: z.string().min(1, "Le contenu est requis."),
    media: z.any().optional(),
});

const NewPost: React.FC = () => {
    const router = useRouter();
    const [media, setMedia] = useState<File | null>(null);
    const [user, setUser] = useState<any | null>(null); // State to hold the current user data

    // Fetch current user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await CurrentUser(); // Fetch current user data
                console.log("User data:", userData);
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
            // Prepare media URL if available
            const mediaUrl = media ? URL.createObjectURL(media) : "https://picsum.photos/600/400";

            // Prepare post data
            const postData = {
                title: values.title,
                subject: values.subject,
                content: values.content,
                media: [
                    {
                        type: "image",
                        url: mediaUrl,
                        id: "",
                        postId: "",
                    } as Media,
                ],
            };

            // Create the post
            await createPost(postData);

            // Redirect to the feed after successful post creation
            router.push("/feed");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Erreur lors de la création du post.");
        }
    };

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setMedia(event.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white px-4 py-6">

            {/* User Info */}
            <div className="flex items-center mb-4">
                <Avatar className="mr-4">
                    <AvatarImage src={user?.data.profile_picture || "https://randomuser.me/api/portraits/men/32.jpg"} alt={user?.data.username || "User"} />
                    <AvatarFallback>{user?.data.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-bold">{user?.data.username || "Utilisateur"}</p>
                    <span className="text-gray-500 text-sm">{user ? "En ligne" : "Déconnecté"}</span>
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
                                <FormLabel>Titre du post</FormLabel>
                                <FormControl>
                                    <Input placeholder="Titre du post" className="text-[16px]" {...field} />
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
                                <FormLabel>Sujet du post</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sujet du post" className="text-[16px]" {...field} />
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
                                <FormLabel>Contenu</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Écrivez quelque chose..." className="text-[16px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Ajouter une image</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </FormItem>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground py-3">
                        Publier
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default NewPost;
