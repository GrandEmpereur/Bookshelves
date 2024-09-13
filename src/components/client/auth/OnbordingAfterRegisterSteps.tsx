"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface OnboardingStepProps {
    step: {
        step: string;
        title: string;
        description: string;
        options: { label: string; value: string }[] | string[];
        images?: string[];
    };
    onNext: (selectedOption: string | string[]) => void;
    onGenreSelect: (selectedGenres: string[]) => void;
    isLastStep: boolean;
}

const OnbordingAfterRegisterSteps: React.FC<OnboardingStepProps> = ({
    step,
    onNext,
    onGenreSelect,
    isLastStep,
}) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    // Handler to toggle genre selection
    const toggleGenreSelection = (genre: string) => {
        setSelectedGenres((prev) => {
            const updatedGenres = prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre];
            onGenreSelect(updatedGenres); // Send updated genres to OnboardingSteps
            return updatedGenres;
        });
    };

    // Handler for button click
    const handleOptionClick = (option: string | { label: string; value: string }) => {
        if (step.step === "favoriteGenres") {
            toggleGenreSelection(option as string);
        } else if (typeof option === "object") {
            onNext(option.value);
        } else {
            onNext(option);
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-4 px-4">
            <h2 className="text-xl font-bold text-center sm:text-2xl">{step.title}</h2>
            <p className="text-center text-muted-foreground">{step.description}</p>
            <div
                className={`flex ${step.step === "favoriteGenres"
                        ? "flex-wrap gap-2 justify-center"
                        : "flex-col gap-y-4"
                    } w-full max-w-lg`}
            >
                {step.options.map((option, index) => (
                    <Button
                        key={index}
                        className={`flex justify-center items-center rounded-full text-center ${step.step === "favoriteGenres"
                                ? selectedGenres.includes(option as string)
                                    ? "bg-primary text-white p-3"
                                    : "bg-primary-300 text-white hover:bg-primary  p-3"
                                : "bg-white border text-black hover:text-white w-full p-8"
                            }`}
                        style={step.step === "favoriteGenres" ? { minWidth: "100px" } : {}}
                        onClick={() => handleOptionClick(option)}
                    >
                        {step.images && step.step !== "favoriteGenres" && (
                            <img
                                src={step.images[index]}
                                alt=""
                                className="mr-2 sm:mr-4 w-8 h-8 sm:w-10 sm:h-10"
                            />
                        )}
                        {typeof option === "object" ? option.label : option}
                    </Button>
                ))}
            </div>
            {step.step === "favoriteGenres" && isLastStep && (
                <Button
                    className="bg-primary text-white mt-4 sm:mt-6 rounded-lg"
                    size={"lg"}
                    onClick={() => onNext(selectedGenres)}
                >
                    Valider
                </Button>
            )}
        </div>
    );
};

export default OnbordingAfterRegisterSteps;
