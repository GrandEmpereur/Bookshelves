"use client";

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from '@/services/authServices';
import { Settings } from "lucide-react";
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError('Erreur lors de la récupération des informations utilisateur.');
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="h-8 w-32 mt-4 rounded" />
        <Skeleton className="h-4 w-48 mt-2 rounded" />
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-4">
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-16 w-full rounded" />
        </div>
      </div>
    );
  }

  const handleSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <Settings className="w-6 h-6 cursor-pointer" onClick={handleSettingsClick} />
      </div>
      <div className="mb-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profile_picture || 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
      <p className="text-gray-500 mb-4">Tu as lu 32 livres</p>
      <div className="flex space-x-2 mb-4">
        <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">Motivation</Button>
        <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">Fiction</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">360</h3>
          <p className="text-gray-500">Amis</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">238</h3>
          <p className="text-gray-500">Livres lus</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">16</h3>
          <p className="text-gray-500">Communauté</p>
        </div>
      </div>

      <Tabs defaultValue="listes" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="listes">Listes</TabsTrigger>
          <TabsTrigger value="amis">Amis</TabsTrigger>
          <TabsTrigger value="communautes">Communautés</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="listes">
          {/* Contenu des listes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img src="/img/onboarding/step1.png" alt="Book Cover" className="w-full h-48 object-cover rounded-lg" />
              <h3 className="mt-2 text-lg font-semibold">Book Title</h3>
            </div>
            {/* Répétez pour chaque livre */}
          </div>
        </TabsContent>
        <TabsContent value="amis">
          {/* Contenu des amis */}
          <p>Contenu des amis</p>
        </TabsContent>
        <TabsContent value="communautes">
          {/* Contenu des communautés */}
          <p>Contenu des communautés</p>
        </TabsContent>
        <TabsContent value="posts">
          {/* Contenu des posts */}
          <p>Contenu des posts</p>
        </TabsContent>
      </Tabs>

      {error && <p className="text-red-500 mt-4">Erreur: {error}</p>}
    </div>
  );
};

export default ProfilePage;
