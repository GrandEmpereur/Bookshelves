"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from "@/components/ui/skeleton";
import { getProfile, updateProfile } from '@/services/profileServices';
import { ArrowLeft } from 'lucide-react';

const MyProfilePage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        username: '',
        birthDate: ''
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getProfile();
                setUser(currentUser);
                setFormData({
                    firstName: currentUser.firstName || '',
                    lastName: currentUser.lastName || '',
                    address: currentUser.adresse || '',
                    phoneNumber: currentUser.phoneNumber || '',
                    email: currentUser.email || '',
                    username: currentUser.username || '',
                    birthDate: currentUser.birthDate ? currentUser.birthDate.split('T')[0] : ''
                });
            } catch (error) {
                setError('Erreur lors de la récupération des informations utilisateur.');
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile(formData);
            setUser(updatedUser);
            alert('Profil mis à jour avec succès');
        } catch (error) {
            setError('Erreur lors de la mise à jour du profil.');
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
                <div className="flex justify-between items-center w-full mb-4">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <div></div>
                </div>
                <div className="w-24 h-24 mb-4">
                    <Skeleton className="w-full h-full rounded-full" />
                </div>
                <Skeleton className="w-32 h-6 mb-2" />
                <form className="w-full max-w-lg space-y-4">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="w-full h-10" />
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
            <div className="flex justify-between items-center w-full mb-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <div></div> {/* Just to center the title */}
            </div>
            <div className="mb-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profilePicture || 'https://github.com/shadcn.png'} />
                    <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <Button variant="link" className="text-blue-500 mt-2">Change Profile Picture</Button>
            </div>
            <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="address">Location</Label>
                    <Input id="address" name="address" type="text" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="phoneNumber">Mobile Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="text" value={formData.email} onChange={handleChange} readOnly />
                </div>
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Changes
                </Button>
            </form>
            {error && <p className="text-red-500 mt-4">Erreur: {error}</p>}
        </div>
    );
};

export default MyProfilePage;
