// components/client/auth/forgot-password/ForgotPassword.tsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ForgotPassword as forgotPasswordServices } from "@/services/authEmailServices";
import { Mail } from "lucide-react";

const forgotPasswordSchema = z.object({
    email: z.string().email("Adresse email invalide"),
});

const ForgotPassword = ({ onNext, onEmailCapture }: { onNext: () => void; onEmailCapture: (email: string) => void }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        try {
            await forgotPasswordServices(values.email);
            setOpenDialog(true);
            onEmailCapture(values.email); // Capturer l'email pour l'étape suivante
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email de réinitialisation :", error);
            form.reset();
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        onNext(); // Passe à l'étape suivante après la fermeture du dialogue
    };

    return (
        <>
            <div className="flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <h1 className="text-4xl font-bold text-center">Mot de passe oublié</h1>
                        <p className="text-center text-muted-foreground mb-6">
                            Veuillez entrer votre adresse email pour recevoir un code de réinitialisation.
                        </p>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Adresse email" {...field} className='text-[16px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-primary text-primary-foreground">Envoyer</Button>
                    </form>
                </Form>
            </div>

            <Dialog open={openDialog} onOpenChange={handleDialogClose}>
                <DialogContent className="flex flex-col items-center text-center gap-y-4">
                    <DialogHeader className="flex flex-col justify-center items-center gap-y-2">
                        <div className="bg-primary rounded-full p-4">
                            <Mail className="text-white" size={24} />
                        </div>
                        <DialogTitle>Vérifiez vos emails</DialogTitle>
                        <DialogDescription className="text-center">
                            Nous avons envoyé les instructions de récupération à votre
                            adresse email.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ForgotPassword;
