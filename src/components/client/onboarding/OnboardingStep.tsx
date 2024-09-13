"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import gsap from 'gsap';

interface OnboardingStepProps {
    step: {
        image: string;
        title: string;
        subtitle: string;
        buttonText: string;
    };
    onNext: () => void;
    onSkip: () => void;
    isLastStep: boolean;
    currentIndex: number;
    totalSteps: number;
}

const OnboardingSteps: React.FC<OnboardingStepProps> = ({
    step,
    onNext,
    onSkip,
    isLastStep,
    currentIndex,
    totalSteps,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
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
                '-=0.5'
            )
            .fromTo(
                descriptionRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(
                dotRefs.current,
                { scale: 1, opacity: 0.5 },
                {
                    scale: (index) => (index === currentIndex ? 1.2 : 1),
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                },
                '-=1'
            );
    }, [step, currentIndex]);

    return (
        <div ref={containerRef} className="flex flex-col items-center w-full max-w-md gap-y-6">
            <div className="absolute top-0 left-0 w-full h-[55vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={step.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Onboarding image"
                    className="object-cover"
                    style={{
                        borderRadius: '0 0 30px 30px',
                    }}
                />
            </div>

            <div className="absolute top-10 right-4 flex justify-end">
                <Button variant="link" className="text-sm" onClick={onSkip}>
                    Passer
                </Button>
            </div>

            <div className="pt-[50vh] md:pt-[65vh] lg:pt-[75vh] flex flex-col items-center gap-y-6">
                <h2
                    className="text-2xl font-bold text-center w-full mb-4 leading-tight"
                    ref={titleRef}
                    style={{ lineHeight: '1.2', marginBottom: '10px' }}
                >
                    {step.title.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className={['mondes', 'préférées', 'passionnés'].includes(word) ? 'text-secondary' : ''}
                        >
                            {word}{' '}
                        </span>
                    ))}
                    {/* Ajoutez un SVG ou une image en dessous si nécessaire */}
                    <div className="mt-2">
                        <Image src="/underline.svg" width={62.92} height={10.3} alt="Wide SVG" />
                    </div>
                </h2>
                <p className="text-center text-gray-600" ref={descriptionRef}>
                    {step.subtitle}
                </p>
                <div className="flex justify-center gap-x-2 mt-4">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                dotRefs.current[index] = el;
                            }}
                            className={`h-[7px] rounded-full ${index === currentIndex ? 'w-[35px] bg-primary' : 'w-[13px] bg-primary-500'
                                }`}
                        ></div>
                    ))}
                </div>

                <Button
                    className="bg-primary text-white w-full"
                    size="lg"
                    onClick={onNext}
                    ref={buttonRef}
                >
                    {step.buttonText}
                </Button>
            </div>
        </div>
    );
};

export default OnboardingSteps;
