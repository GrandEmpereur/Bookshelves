"use client";

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCurrentUser } from '@/services/authentication';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="mb-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profilePicture || 'https://github.com/shadcn.png'} />
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

      <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" value={user.firstName || ''} readOnly />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" value={user.lastName || ''} readOnly />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" type="text" value={user.address || ''} readOnly />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Mobile Number</Label>
          <Input id="phoneNumber" type="text" value={user.phoneNumber || ''} readOnly />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={user.email || ''} readOnly />
        </div>
      </div>

      <Button className=" text-white px-4 py-2 mt-4 rounded ">
        Modifier le profil
      </Button>

      {error && <p className="text-red-500 mt-4">Erreur: {error}</p>}
    </div>
  );
};

export default ProfilePage;
