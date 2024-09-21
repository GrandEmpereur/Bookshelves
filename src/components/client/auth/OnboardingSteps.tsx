// components/client/auth/OnboardingSteps.tsx

"use client";

import React, { useState } from "react";
import { UpdateUserPreferences, UpdateUserPreferencesGenres } from "@/services/profileService";
import OnbordingAfterRegisterSteps from "@components/client/auth/OnbordingAfterRegisterSteps";
import { login } from "@/services/authService";

const onboardingSteps = [
    {
        step: "usagePurpose",
        title: "Que faites vous sur Bookish",
        description: "Nous voulons juste apprendre à mieux vous connaître",
        options: [
            { label: "Trouver de nouveaux livres", value: "find_books" },
            { label: "Trouver une communauté", value: "find_community" },
            { label: "Les deux", value: "both" },
        ],
        images: [
            "/img/onbordingRegisterSetp/Book_Lover.png",
            "/img/onbordingRegisterSetp/Bookshelves_design.png",
            "/img/onbordingRegisterSetp/Notebook_Design.png",
        ],
    },
    {
        step: "readingHabit",
        title: "Quelles sont vos habitudes de lecture ?",
        description: "Nous voulons juste apprendre à mieux vous connaître",
        options: [
            { label: "Je suis un rat de bibliothèque", value: "library_rat" },
            { label: "J'aime lire de temps en temps", value: "occasional_reader" },
            { label: "Je commence à lire", value: "beginner_reader" },
        ],
        images: [
            "/img/onbordingRegisterSetp/Book_Lover.png",
            "/img/onbordingRegisterSetp/Bookshelves_design.png",
            "/img/onbordingRegisterSetp/Notebook_Design.png",
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

const OnboardingSteps = ({
    onComplete,
    email,
    password, // Capture the password
}: {
    onComplete: () => void;
    email: string;
    password: string;
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedPreferences, setSelectedPreferences] = useState({
        usagePurpose: "",
        readingHabit: "",
        genres: [] as string[],
    });

    const handleNext = (selectedOption: string | string[]) => {
        const current = onboardingSteps[currentStep].step;

        if (current === "usagePurpose") {
            setSelectedPreferences((prev) => ({
                ...prev,
                usagePurpose: selectedOption as string,
            }));
        }

        if (current === "readingHabit") {
            setSelectedPreferences((prev) => ({
                ...prev,
                readingHabit: selectedOption as string,
            }));
        }

        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            sendPreferencesToDB();
        }
    };

    const handleGenreSelection = (selectedGenres: string[]) => {
        setSelectedPreferences((prev) => ({
            ...prev,
            genres: selectedGenres,
        }));
    };

    const sendPreferencesToDB = async () => {
        try {
            // Save user preferences to the database
            await UpdateUserPreferences(
                email,
                selectedPreferences.readingHabit,
                selectedPreferences.usagePurpose
            );
            await UpdateUserPreferencesGenres(email, selectedPreferences.genres);

            const response = await login(email, password); // Use the captured password to log the user in

            if (response) {
                onComplete();
            } else {
                console.error("Login failed:", response);
            }
        } catch (error) {
            console.error("Failed to save preferences or log in:", error);
            // Optionally, display an error message to the user
        }
    };


    return (
        <>
            <OnbordingAfterRegisterSteps
                step={onboardingSteps[currentStep]}
                onNext={handleNext}
                onGenreSelect={handleGenreSelection}
                isLastStep={currentStep === onboardingSteps.length - 1}
            />
        </>
    );
};

export default OnboardingSteps;
