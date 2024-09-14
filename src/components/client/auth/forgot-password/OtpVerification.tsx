// components/client/auth/forgot-password/OtpVerification.tsx

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordVerify } from "@/services/authEmailServices";

const otpSchema = z.object({
    otp: z.string().min(4, "Le code OTP doit avoir au moins 4 chiffres"),
});

const OtpVerificationStep = ({ onNext, email }: { onNext: () => void; email: string }) => {
    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof otpSchema>) => {
        try {
            await PasswordVerify(email, values.otp); // Vérifie l'OTP avec l'email
            onNext(); // Passe à l'étape suivante
        } catch (error) {
            console.error("Erreur lors de la vérification du code OTP :", error);
            form.reset();
        }
    };

    return (
        <div className="flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h1 className="text-4xl font-bold text-center">Vérification du code</h1>
                    <p className="text-center text-muted-foreground mb-6">
                        Veuillez entrer le code OTP que nous vous avons envoyé.
                    </p>

                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code OTP</FormLabel>
                                <FormControl>
                                    <Input placeholder="Code OTP" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-primary text-primary-foreground">Vérifier</Button>
                </form>
            </Form>
        </div>
    );
};

export default OtpVerificationStep;
