"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Preferences } from '@capacitor/preferences';

const App: React.FC = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      // Effectue les vérifications avant l'animation
      // set hasCompletedOnboarding to false to test the onboarding screen
      // await Preferences.set({ key: 'hasCompletedOnboarding', value: 'false' });


      const { value } = await Preferences.get({ key: 'hasCompletedOnboarding' });
      console.log('hasCompletedOnboarding:', value);

      if (value === 'true') {
        setRedirectPath(isAuthenticated ? '/feed' : '/auth/login');
      } else {
        setRedirectPath('/onboarding');
        await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
      }
    };

    console.log('redirectPath:', redirectPath);

    // Appel de la fonction de vérification
    checkStatus().then(() => {
      // Lance l'animation une fois les vérifications terminées
      gsap.timeline({
        onComplete: () => {
          // Redirige une fois l'animation terminée
          if (redirectPath) {
            router.push(redirectPath);
          }
        },
      })
        .fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
    });
  }, [isAuthenticated, router, redirectPath]);

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
