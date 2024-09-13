"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface OnboardingStepProps {
    step: {
        step: string;
        title: string;
        description: string;
        options: string[];
    };
    onNext: () => void;
    isLastStep: boolean;
}

const OnbordingAfterRegisterSteps: React.FC<OnboardingStepProps> = ({
    step,
    onNext,
    isLastStep,
}) => {
    return (
        <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-center text-muted-foreground">{step.description}</p>
            <div className="flex flex-col gap-y-4">
                {step.options.map((option, index) => (
                    <Button
                        key={index}
                        className="bg-white border text-black w-full p-4"
                        onClick={() => onNext()}
                    >
                        {option}
                    </Button>
                ))}
            </div>
            {isLastStep && (
                <Button className="bg-primary text-white mt-6" onClick={onNext}>
                    Valider
                </Button>
            )}
        </div>
    );
};

export default OnbordingAfterRegisterSteps;
