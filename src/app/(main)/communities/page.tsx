"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TextField, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import options from "@/lib/api";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, Search, Bell, Plus, Loader, Crown } from 'lucide-react';

// INTERFACES
import { Community } from '@/interfaces/community';
import { User } from '@/interfaces/user';
// END INTERFACES



const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newCommunity, setNewCommunity] = useState({ name: '', description: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'my'>('all');

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('https://bookish.empereur.me/api/community', options);
        const userResponse = await axios.get('https://bookish.empereur.me/auth/me', options);
        setUser(userResponse.data);

        if (Array.isArray(response.data)) {
          setCommunities(response.data);
          setFilteredCommunities(response.data);
        } else {
          setError('Invalid data format for communities');
        }
      } catch (error: any) {
        setError('Error fetching the community data');
        console.error('Error fetching the community data:', error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredCommunities(communities);
    } else if (filter === 'my' && user) {
      const myCommunities = communities.filter(community =>
        user.roles.includes(`owner_community_${community.communityId}`) ||
        user.roles.includes(`member_community_${community.communityId}`)
      );
      setFilteredCommunities(myCommunities);
    }
  }, [filter, communities, user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCommunity({ ...newCommunity, [name]: value });
  };

  const handleAddCommunity = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const communityData = {
        name: newCommunity.name,
        description: newCommunity.description
      };

      const response = await axios.post('https://bookish.empereur.me/api/community', communityData, options);

      setCommunities([...communities, response.data]);
      setNewCommunity({ name: '', description: '' });
      setShowDialog(false);
    } catch (error: any) {
      setError('Error adding the community');
      if (error.response) {
        console.error('Error adding the community:', error.response.data);
      } else {
        console.error('Error adding the community:', error.message);
      }
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setError(null);
    setNewCommunity({ name: '', description: '' });
  }

  return (
    <div className=" mx-auto px-4 py-8 flex flex-col gap-6">

      <h1 className="h1 mx-auto">Communautés</h1>

      <div className='scroll-container'>
        <div className='scroll-content'>
          <Button variant={filter === 'all' ? "outlineActive" : "outline"} onClick={() => setFilter('all')}>Toutes</Button>
          <Button variant={filter === 'my' ? "outlineActive" : "outline"} onClick={() => setFilter('my')}>Mes communautés</Button>
        </div>
        <div>
          <Plus className="h-5 w-5" onClick={() => { setShowDialog(true); }} />
        </div>
      </div>


      {error && <Typography color="error">{error}</Typography>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCommunities.map((community) => (
          <Link key={community.communityId} href={`/community/${community.communityId}`} className="flex flex-col gap-2 bg-white p-3 shadow-[0_4px_6px_rgba(0,0,0,0.2)] rounded-2xl h-full">
            <div className="relative">

              {/* When is owner of the community */}
              {/* <Crown className="absolute top-2 left-2 h-5 w-5 text-[#ECCB26]" fill="#ECCB26" /> */}
              {community.image ? (
                <img className="rounded-2xl" src={community.image} alt="Image for the community" />
              ) : (
                <img className="rounded-2xl" src="/img/img_cate.png" alt="Logo" />
              )}
            </div>
            <p className="font-semibold">{community.name}</p>
          </Link>
        ))}
      </div>

      <Dialog open={showDialog} onClose={handleCancel}>
        <DialogTitle>Créer une nouvelle communauté</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddCommunity}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={newCommunity.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={newCommunity.description}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button type="button" onClick={handleCancel} color="primary">
                Annuler
              </Button>
              <Button type="submit" color="primary">
                Créer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;
