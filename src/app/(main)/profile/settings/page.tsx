"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bookmark, BarChart, Bell, HelpCircle, Shield, Trash2, LogOut, Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <Button variant="accentVariant" size={"icon"} className="p-2" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold flex-grow text-center">Settings</h1>
        <div className="w-6 h-6"></div> {/* Espace réservé pour centrer le titre */}
      </div>

      <div className="space-y-4 w-full max-w-2xl">
        <Card className="p-4">
          <CardContent>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/profile/settings/myProfile')}>
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Profile
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/bookmarked')}>
              <div className="flex items-center">
                <Bookmark className="w-5 h-5 mr-2" />
                Bookmarked
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/statistics')}>
              <div className="flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                Statistics
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/notifications')}>
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </div>
              <span>&gt;</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/help')}>
              <div className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Get help
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/privacy-policy')}>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy policy
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/delete-account')}>
              <div className="flex items-center">
                <Trash2 className="w-5 h-5 mr-2" />
                Delete account
              </div>
              <span>&gt;</span>
            </Button>
            <Button className="w-full flex justify-between items-center" variant="ghost" onClick={() => navigateTo('/logout')}>
              <div className="flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                Log out
              </div>
              <span>&gt;</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
