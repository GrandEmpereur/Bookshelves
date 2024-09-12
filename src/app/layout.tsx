"use client";

import React from 'react';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';

// Import local fonts
const primary = localFont({
  src: [
    {
      path: '../../fonts/Neuton/Neuton-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Neuton/Neuton-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Neuton/Neuton-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-primary',
});

const secondary = localFont({
  src: [
    {
      path: '../../fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Poppins/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../fonts/Poppins/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../fonts/Poppins/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../fonts/Poppins/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-secondary',
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="fr-FR" className={`${primary.variable} ${secondary.variable}`}>
      <head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <AuthProvider>
          <main className="flex flex-col min-h-screen">
            <div className="flex-1 flex flex-col h-full justify-center items-center">
              {children}
            </div>
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
