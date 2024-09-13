"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterStep from "@components/client/auth/RegisterStep";
import OtpVerificationStep from "@components/client/auth/OtpVerificationStep";
import OnboardingSteps from "@components/client/auth/OnboardingSteps";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handleEmailCapture = (email: string) => setUserEmail(email);
  const handleOnboardingComplete = () => {
    router.push("/feed");
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      {currentStep === 0 && (
        <RegisterStep onNext={handleNextStep} onEmailCapture={handleEmailCapture} />
      )}
      {currentStep === 1 && (
        <OtpVerificationStep onNext={handleNextStep} email={userEmail} />
      )}
      {currentStep === 2 && (
        <OnboardingSteps onComplete={handleOnboardingComplete} email={userEmail} />
      )}
    </div>
  );
};

export default Register;
