"use client"

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
                Life is short and the world is <span className="text-secondary">wide</span>
            </>
        ),
        description: 'At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world',
        buttonText: 'Get Started',
    },
    {
        image: '/img/onboarding/step2.png',
        title: (
            <>
                It’s a big world out there go <span className="text-secondary">explore</span>
            </>
        ),
        description: 'To get the best of your adventure you just need to leave and go where you like, we are waiting for you',
        buttonText: 'Next',
    },
    {
        image: '/img/onboarding/step3.png',
        title: (
            <>
                People don’t take trips, trips take <span className="text-secondary">people</span>
            </>
        ),
        description: 'To get the best of your adventure you just need to leave and go where you like, we are waiting for you',
        buttonText: 'Next',
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
                    <Button variant={'link'} className="text-sm" onClick={handleSkip}>Skip</Button>
                </div>
                <h2 className="relative text-2xl font-bold text-center w-[309px]" ref={titleRef}>
                    {onboardingScreens[currentScreen].title}
                    {currentScreen === 0 && (
                        <div className="absolute bottom-[-15px] right-[75px] justify-center mt-2">
                            <Image src="/underline.svg" width={62.92} height={10.3} alt="Wide SVG" />
                        </div>
                    )}
                </h2>
                <p className="text-center text-gray-600" ref={descriptionRef}>
                    {onboardingScreens[currentScreen].description}
                </p>
                <div className="flex justify-center gap-x-2 mt-4">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                dotRefs.current[index] = el;
                            }}
                            className={`w-${index === currentScreen ? '[35px]' : '[13px]'} h-[7px] rounded-full ${index === currentScreen ? 'bg-primary' : 'bg-primary-500'}`}
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
