// src/app/onboarding/page.tsx

"use client";

import React from 'react';
import OnboardingContainer from '@components/client/onboarding/OnboardingContainer';

const OnboardingPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-white">
            <OnboardingContainer />
        </div>
    );
};

export default OnboardingPage;
