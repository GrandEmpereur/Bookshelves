"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import gsap from 'gsap';
import Link from 'next/link';

const onboardingScreens = [
    {
        image: '/img/onboarding/step1.png',
        title: (
            <>
                Découvrez de nouveaux <span className="text-secondary">mondes</span>
            </>
        ),
        description: 'Plongez dans l\'univers fascinant des livres et découvrez des histoires captivantes. Rejoignez notre communauté de passionnés pour explorer.',
        buttonText: 'Suivant',
    },
    {
        image: '/img/onboarding/step2.png',
        title: (
            <>
                Partagez vos lectures <span className="text-secondary">préférées</span>
            </>
        ),
        description: 'Échangez vos coups de cœur littéraires. Partagez vos avis, vos recommandations et découvrez de nouveaux livres grâce aux suggestions de notre communauté.',
        buttonText: 'Suivant',
    },
    {
        image: '/img/onboarding/step3.png',
        title: (
            <>
                Discutez avec d'Autres <span className="text-secondary">passionnés</span>
            </>
        ),
        description: 'Engagez-vous dans des discussions passionnantes avec d\'autres amateurs de littérature. Partagez vos réflexions.',
        buttonText: 'Commencer',
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
                <div className="absolute top-[80px] right-16 w-full flex justify-end">
                    <Link href="/feed" >
                        feed
                    </Link>
                </div>
                <h2 className="relative text-2xl font-bold text-center w-[309px]" ref={titleRef}>
                    {onboardingScreens[currentScreen].title}
                    <div className="absolute bottom-[-15px] right-[120px] justify-center mt-2">
                        <Image src="/underline.svg" width={62.92} height={10.3} alt="Wide SVG" />
                    </div>
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
