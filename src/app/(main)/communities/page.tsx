"use client";

import React, { useEffect, useState } from "react";
import { fetchCommunities, createCommunity, joinCommunity, leaveCommunity } from "@/services/communityServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [joinedCommunities, setJoinedCommunities] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newCommunityName, setNewCommunityName] = useState<string>('');
  const [newCommunityDescription, setNewCommunityDescription] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommunities();
        console.log('Fetched data:', data);
        setCommunities(data);
      } catch (err) {
        setError("Error fetching communities");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleJoinCommunity = async (communityId: string) => {
    try {
      await joinCommunity(communityId);
      setJoinedCommunities([...joinedCommunities, communityId]);
    } catch (err) {
      setError("Error joining community");
    }
  };

  const handleLeaveCommunity = async (communityId: string) => {
    try {
      await leaveCommunity(communityId);
      setJoinedCommunities(joinedCommunities.filter(id => id !== communityId));
    } catch (err) {
      setError("Error leaving community");
    }
  };

  const handleCreateCommunity = async () => {
    try {
      const newCommunity = await createCommunity(newCommunityName, newCommunityDescription);
      setCommunities([newCommunity, ...communities]);
      setNewCommunityName('');
      setNewCommunityDescription('');
    } catch (err) {
      setError("Error creating community");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Communautés</h1>
        <Button variant="link" className="text-sm" onClick={() => router.push('/community/search')}>Rechercher</Button>
      </div>
      <div className="flex space-x-4 mb-4">
        <Button variant="secondary">Toutes les communautés</Button>
        <Button variant="outline">Mes communautés</Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <Skeleton className="w-full h-40 mb-4 rounded" />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {communities.map(community => (
            <div key={community.community_id} className="community-item p-4 bg-white rounded-lg shadow">
              <Image
                src={community.image || 'https://via.placeholder.com/150'}
                alt="Community image"
                width={150}
                height={150}
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{community.name}</h3>
              <p className="text-sm text-gray-500">{community.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={community.user?.profilePicture || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{community.user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm text-gray-500">{community.members_count} membres</span>
                </div>
                <button onClick={() => joinedCommunities.includes(community.community_id) ? handleLeaveCommunity(community.community_id) : handleJoinCommunity(community.community_id)} className="flex items-center">
                  {joinedCommunities.includes(community.community_id) ? <Heart className="text-red-500" /> : <Heart />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'} size={'icon'} className="fixed bottom-[125px] right-10 rounded-full ">
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle communauté</DialogTitle>
            <DialogDescription>Remplissez les détails de votre nouvelle communauté ci-dessous</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="newCommunityName">Nom</Label>
              <Input id="newCommunityName" value={newCommunityName} onChange={(e) => setNewCommunityName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="newCommunityDescription">Description</Label>
              <Textarea id="newCommunityDescription" value={newCommunityDescription} onChange={(e) => setNewCommunityDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCommunity}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;
