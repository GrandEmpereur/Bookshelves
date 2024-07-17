"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TextField, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import options from '../api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, Search, Bell, Plus, Loader } from 'lucide-react';

// INTERFACES
import { Community } from '@/interfaces/community';
// END INTERFACES



const CommunityPage: React.FC = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newCommunity, setNewCommunity] = useState({ name: '', description: '' });
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await axios.get('https://bookish.empereur.me/api/community', options);

                if (Array.isArray(response.data)) {
                    setCommunities(response.data);
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
            console.log('Sending community data:', communityData);

            const response = await axios.post('https://bookish.empereur.me/api/community', communityData, options);
            console.log('Response from server:', response.data);

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

    return (
        <div className=" mx-auto px-4 py-8 flex flex-col gap-6">

        <h1 className="h1 mx-auto">Communities</h1>

            <div className='scroll-container'>
                <div className='scroll-content'>
                    <Button variant="outline">All Communities</Button>
                    <Button variant="outlineActive">My Communities</Button>
                </div>
                <div>
                    <Plus className="h-5 w-5" onClick={() => {setShowDialog(true);}}/>
                </div>
            </div>
            

            {error && <Typography color="error">{error}</Typography>}

            <div className="grid grid-cols-2 gap-4">
                {communities.map((community) => (
                <div>
                    <Link  key={community.communityId} href={`/community/${community.communityId}`}  className="flex flex-col gap-2 bg-white p-3 shadow-[0_4px_6px_rgba(0,0,0,0.05)] rounded-2xl h-full">

                    { community.image ?
                        <img className="rounded-2xl" src={community.image} alt="Image for the community" />
                        :                     
                        <img className="rounded-2xl" src="/img/img_cate.png" alt="Logo" />
                    }

                    <p className="font-semibold">{community.name}</p>
                    </Link>
                </div>
                ))}
            </div>
  
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>Add New Community</DialogTitle>
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
                    
                            <Button onClick={() => { setShowDialog(false); setError(null); }} color="primary">
                                Cancel
                            </Button>

                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CommunityPage;
