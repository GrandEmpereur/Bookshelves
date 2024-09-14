// pages/auth/forgot-password/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "@components/client/auth/forgot-password/ForgotPassword";
import OtpVerificationStep from "@components/client/auth/forgot-password/OtpVerification";
import ResetPassword from "@components/client/auth/forgot-password/ResetPassword";

const ForgotPasswordPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState("");
    const router = useRouter();

    // Passer à l'étape suivante
    const handleNextStep = () => setCurrentStep(currentStep + 1);

    // Capturer l'email de l'utilisateur
    const handleEmailCapture = (email: string) => setEmail(email);

    // Rediriger l'utilisateur vers la page de login après la réinitialisation
    const handleResetComplete = () => {
        setCurrentStep(0);
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {currentStep === 0 && (
                <ForgotPassword onNext={handleNextStep} onEmailCapture={handleEmailCapture} />
            )}
            {currentStep === 1 && (
                <OtpVerificationStep onNext={handleNextStep} email={email} />
            )}
            {currentStep === 2 && (
                <ResetPassword onResetComplete={handleResetComplete} email={email} />
            )}
        </div>
    );
};

export default ForgotPasswordPage;
