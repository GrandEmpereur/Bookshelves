"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import gsap from 'gsap';
import { Badge } from '@/components/ui/badge';

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

    // Define the position of the underline based on the current step
    const underlinePosition = currentIndex === 0 ? "left-[145px]" : currentIndex === 1 ? "left-[90px]" : "left-[95px]";

    return (
        <div ref={containerRef} className="flex flex-col items-center w-full max-w-md gap-y-6">
            <div className="absolute top-0 left-0 w-full h-[52vh] md:h-[60vh] lg:h-[70vh]">
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

            <div className="absolute top-[70px] right-4 flex justify-end text-2xl">
                <Badge variant={'default'} className="text-sm px-4" onClick={onSkip}>
                    Passer
                </Badge>
            </div>

            <div className="pt-[45vh] md:pt-[65vh] lg:pt-[75vh] flex flex-col items-center px-[20px] gap-y-3">
                <h2
                    className="text-2xl font-heading font-bold text-center mb-4 leading-tight"
                    ref={titleRef}
                    style={{ lineHeight: '1.5', marginBottom: '10px', width: '250px' }}
                >
                    {step.title.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className={['mondes', 'préférées', 'passionnés'].includes(word) ? 'text-secondary' : ''}
                        >
                            {word}{' '}
                        </span>
                    ))}
                    <div className={`mt-1 relative ${underlinePosition}`}>
                        <Image src="/underline.svg" width={70} height={15} alt="Wide SVG" />
                    </div>
                </h2>
                <p className="text-center font-body text-gray-600" ref={descriptionRef}>
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
                    className="bg-primary text-white w-full mt-4 rounded-[16px]"
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
