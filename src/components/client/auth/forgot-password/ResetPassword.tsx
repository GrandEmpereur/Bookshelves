// components/client/auth/forgot-password/ResetPassword.tsx

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResetPassword as resetPassword } from "@/services/authEmailServices";

const resetPasswordSchema = z.object({
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

const ResetPassword = ({ onResetComplete, email }: { onResetComplete: () => void; email: string }) => {
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        try {
            await resetPassword(email, values.password);
            onResetComplete();
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe :", error);
            form.reset();
        }
    };

    return (
        <div className="flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h1 className="text-4xl font-bold text-center">Réinitialiser le mot de passe</h1>

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Nouveau mot de passe" {...field} className="text-[16px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmer le mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirmer le mot de passe" {...field} className="text-[16px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-primary text-primary-foreground">Réinitialiser</Button>
                </form>
            </Form>
        </div>
    );
};

export default ResetPassword;
