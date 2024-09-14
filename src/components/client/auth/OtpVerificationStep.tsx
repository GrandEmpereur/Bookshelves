"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    EmailVerify,
    ResendVerificationEmail as resendVerificationEmailService,
} from "@services/authEmailServices";
import { useState, useEffect } from "react";

const verifySchema = z.object({
    verificationCode: z
        .string()
        .length(6, "Le code de vérification doit contenir 6 chiffres"),
});

const OtpVerificationStep = ({
    onNext,
    email,
}: {
    onNext: () => void;
    email: string;
}) => {
    const [otpError, setOtpError] = useState<string | null>(null);
    const [resendCountdown, setResendCountdown] = useState(90); // Countdown set to 90 seconds
    const verifyForm = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            verificationCode: "",
        },
    });

    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setInterval(() => {
                setResendCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendCountdown]);

    const onVerifySubmit = async (values: z.infer<typeof verifySchema>) => {
        try {
            await EmailVerify(email, values.verificationCode);
            onNext();
        } catch (error) {
            setOtpError(
                (error as { response?: { data?: { message: string } } }).response?.data!
                    .message || "Le code de vérification est incorrect ou a expiré."
            );
        }
    };

    const resendVerificationEmail = async () => {
        try {
            await resendVerificationEmailService(email);
            setResendCountdown(90); // Reset the countdown
        } catch (error) {
            setOtpError(
                (error as { response?: { data?: { message: string } } }).response?.data!
                    .message || "Erreur lors de l'envoi du code de vérification."
            );
        }
    };

    return (
        <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Authentification</h2>
                <p className="text-center text-muted-foreground">
                    Veuillez vérifier votre e-mail <span className="font-medium">{email}</span> pour voir le code de vérification.
                </p>
                <FormField
                    control={verifyForm.control}
                    name="verificationCode"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                            <FormLabel className="text-lg">Code</FormLabel>
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
                <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground"
                >
                    Valider
                </Button>
                {otpError && <p className="text-error text-center">{otpError}</p>}
                <p className="text-sm text-center text-muted-foreground mt-4">
                    {resendCountdown > 0
                        ? `Renvoie du code dans :${String(
                            Math.floor(resendCountdown / 60)
                        ).padStart(2, "0")}:${String(resendCountdown % 60).padStart(
                            2,
                            "0"
                        )}`
                        : (
                            <span
                                onClick={resendVerificationEmail}
                                className="text-secondary cursor-pointer"
                            >
                                Renvoyer le code
                            </span>
                        )}
                </p>
            </form>
        </Form>
    );
};

export default OtpVerificationStep;
