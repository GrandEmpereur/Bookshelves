"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import OnboardingSteps from './OnboardingStep';

const onboardingScreens = [
    {
        image: '/img/onboarding/step1.png',
        title: 'Découvrez de nouveaux mondes',
        subtitle: 'Plongez dans l\'univers fascinant des livres et découvrez des histoires captivantes. Rejoignez notre communauté.',
        buttonText: 'Suivant',
    },
    {
        image: '/img/onboarding/step2.png',
        title: 'Partagez vos lectures préférées',
        subtitle: 'Partagez vos avis, vos recommandations et découvrez de nouveaux livres grâce aux suggestions de notre communauté',
        buttonText: 'Suivant',
    },
    {
        image: '/img/onboarding/step3.png',
        title: 'Discutez avec d\'autres passionnés',
        subtitle: 'Engagez-vous dans des discussions passionnantes avec d\'autres amateurs de littérature. Partagez vos réflexions.',
        buttonText: 'Commencer',
    },
];

const OnboardingContainer: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        if (currentStep < onboardingScreens.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    router.push('/auth/login');
                },
            });
        }
    };

    const handleSkip = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                router.push('/auth/login');
            },
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-center w-full h-screen onboarding-container bg-white text-black"
        >
            <OnboardingSteps
                step={onboardingScreens[currentStep]}
                onNext={handleNext}
                onSkip={handleSkip}
                isLastStep={currentStep === onboardingScreens.length - 1}
                currentIndex={currentStep} // Ajout pour le suivi de l'étape actuelle
                totalSteps={onboardingScreens.length} // Ajout pour le nombre total d'étapes
            />
        </div>
    );
};

export default OnboardingContainer;
