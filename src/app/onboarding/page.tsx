"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import gsap from 'gsap';

const onboardingScreens = [
    {
        image: '/img/onboarding/step1.png',
        title: (
            <>
                La vie est courte et le monde est <span className="text-secondary">vaste</span>
            </>
        ),
        description: 'Chez Bookish, nous personnalisons des voyages éducatifs fiables et dignes de confiance vers des destinations du monde entier',
        buttonText: 'Commencer',
    },
    {
        image: '/img/onboarding/step2.png',
        title: (
            <>
                C’est un grand monde là-bas, allez <span className="text-secondary">explorer</span>
            </>
        ),
        description: 'Pour tirer le meilleur parti de votre aventure, il vous suffit de partir et d’aller où vous aimez, nous vous attendons',
        buttonText: 'Suivant',
    },
    {
        image: '/img/onboarding/step3.png',
        title: (
            <>
                Les gens ne prennent pas de voyages, les voyages prennent <span className="text-secondary">les gens</span>
            </>
        ),
        description: 'Pour tirer le meilleur parti de votre aventure, il vous suffit de partir et d’aller où vous aimez, nous vous attendons',
        buttonText: 'Suivant',
    },
];

const OnboardingScreen: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' }
        )
            .fromTo(
                titleRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: 'power3.out' },
                "-=0.5"
            )
            .fromTo(
                descriptionRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: 'power3.out' },
                "-=0.5"
            )
            .fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                "-=0.5"
            )
            .fromTo(
                dotRefs.current,
                { scale: 1, opacity: 0.5 },
                { scale: (index) => (index === currentScreen ? 1.2 : 1), opacity: 1, duration: 0.5, ease: 'power3.out' },
                "-=1"
            );
    }, [currentScreen]);

    const handleNext = () => {
        if (currentScreen < onboardingScreens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    router.push('/auth/login');
                }
            });
        }
    };

    const handleSkip = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                router.push('/auth/login');
            }
        });
    };

    return (
        <div className="relative flex items-center justify-center w-full h-screen bg-white text-black">
            <div className='absolute top-0 left-0 w-full'>
                <Image
                    src={onboardingScreens[currentScreen].image}
                    width={375}
                    height={444}
                    alt="Onboarding image"
                    className="rounded-b-[30px] w-full"
                    ref={imageRef}
                />
            </div>
            <div ref={containerRef} className="flex flex-col items-center w-full max-w-md p-4 gap-y-6 pt-[440px]">
                <div className="absolute top-12 right-12 w-full flex justify-end">
                    <Button variant={'link'} className="text-sm" onClick={handleSkip}>Passer</Button>
                </div>
                <h2 className="relative text-2xl font-bold text-center w-[309px]" ref={titleRef}>
                    {onboardingScreens[currentScreen].title}
                    {currentScreen === 0 && (
                        <div className="absolute bottom-[-15px] right-[60px] justify-center mt-2">
                            <Image src="/underline.svg" width={62.92} height={10.3} alt="Wide SVG" />
                        </div>
                    )}
                </h2>
                <p className="text-center text-gray-600" ref={descriptionRef}>
                    {onboardingScreens[currentScreen].description}
                </p>
                <div className="flex justify-center gap-x-2 mt-4">
                    {onboardingScreens.map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => { dotRefs.current[index] = el; }}
                            className={`h-[7px] rounded-full ${index === currentScreen ? 'w-[35px] bg-primary' : 'w-[13px] bg-primary-500'}`}
                        ></div>
                    ))}
                </div>
                <Button className="bg-primary text-white w-full" size={'lg'} onClick={handleNext} ref={buttonRef}>
                    {onboardingScreens[currentScreen].buttonText}
                </Button>
            </div>
        </div>
    );
};

export default OnboardingScreen;
