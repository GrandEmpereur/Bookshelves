import React from 'react';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from "@/components/ui/toaster"

// Importer les polices locales
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
    <html lang="en" className={`${primary.variable} ${secondary.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
