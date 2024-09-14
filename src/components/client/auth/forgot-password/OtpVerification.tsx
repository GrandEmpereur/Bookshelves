"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordVerify } from "@/services/authEmailServices";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

// Define the OTP schema with a 6-character constraint
const otpSchema = z.object({
    otp: z.string().length(6, "Le code OTP doit avoir exactement 6 chiffres"),
});

// OTP Verification Step Component
const OtpVerificationStep = ({ onNext, email }: { onNext: () => void; email: string }) => {
    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    // Handle form submission
    const onSubmit = async (values: z.infer<typeof otpSchema>) => {
        try {
            await PasswordVerify(email, values.otp); // Verify the OTP with the email
            onNext(); // Proceed to the next step
        } catch (error) {
            console.error("Erreur lors de la vérification du code OTP :", error);
            form.reset(); // Reset form on error
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
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="text-lg">Code OTP</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        maxLength={6}
                                        className="flex justify-center gap-x-2"
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
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
