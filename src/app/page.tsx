"use client";

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Preferences } from '@capacitor/preferences'; // Importation de l'API Preferences

const App: React.FC = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleAnimationComplete = async () => {
      const { value } = await Preferences.get({ key: 'hasCompletedOnboarding' }); // Utilisation de Preferences

      if (value === 'true') {
        if (isAuthenticated) {
          router.push('/feed');
        } else {
          router.push('/auth/login');
        }
      } else {
        await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
        router.push('/onboarding');
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        handleAnimationComplete(); // Appel à la fonction une fois l'animation terminée
      },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-primary">
      <div ref={containerRef} className="flex flex-col items-center gap-y-5">
        <Image src="/Bookish.svg" width={100} height={86} alt="Logo" />
        <p ref={textRef} className="text-4xl font-heading uppercase text-white font-bold">
          Bookish
        </p>
      </div>
    </div>
  );
};

export default App;
