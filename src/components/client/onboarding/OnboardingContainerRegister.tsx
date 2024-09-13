"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import OnbordingAfterRegisterSteps from "@components/client/onboarding/OnbordingAfterRegisterSteps";

const onboardingSteps = [
    {
        step: "usagePurpose",
        title: "Que faites vous sur Bookish",
        description: "Nous voulons juste apprendre à mieux vous connaître",
        options: ["Trouver de nouveaux livres", "Trouver une communauté", "Les deux"],
    },
    {
        step: "readingHabit",
        title: "Quelles sont vos habitudes de lecture ?",
        description: "Nous voulons juste apprendre à mieux vous connaître",
        options: [
            "Je suis un rat de bibliothèque",
            "J'aime lire de temps en temps",
            "Je commence à lire",
        ],
    },
    {
        step: "favoriteGenres",
        title: "Quels sont les genres de livres que vous aimez lire ?",
        description: "",
        options: [
            "Développement personnel",
            "Fiction",
            "Sports",
            "Inspiration",
            "Éducation",
            "Non-Fiction",
            "Sci-fi",
            "Aventure",
            "Horror",
            "Romance",
            "Essai",
            "Shojo",
            "Comics",
            "Roman",
            "Shônen",
            "Western",
            "Thriller",
            "Young adults",
            "Biographie",
            "Policier",
        ],
    },
];

const OnboardingContainer: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            gsap.to(".onboarding-container", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    router.push("/feed");
                },
            });
        }
    };

    return (
        <div className="relative flex items-center justify-center w-full h-screen onboarding-container">
            <OnbordingAfterRegisterSteps
                step={onboardingSteps[currentStep]}
                onNext={handleNext}
                isLastStep={currentStep === onboardingSteps.length - 1}
            />
        </div>
    );
};

export default OnboardingContainer;
