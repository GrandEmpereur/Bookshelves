// app/community/page.tsx

"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TextField, Button, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import options from '../api';

interface Community {
    communityId: string;
    name: string;
    description: string;
}

const CommunityPage: React.FC = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newCommunity, setNewCommunity] = useState({ name: '', description: '' });
    const [showDialog, setShowDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCommunity, setCurrentCommunity] = useState<Community | null>(null);


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
        if (isEditing && currentCommunity) {
            handleUpdateCommunity(currentCommunity.communityId);
        } else {
            try {
                const response = await axios.post('https://bookish.empereur.me/api/community', newCommunity, options);
                setCommunities([...communities, response.data]);
                setNewCommunity({ name: '', description: '' });
                setShowDialog(false);
            } catch (error: any) {
                setError('Error adding the community');
                console.error('Error adding the community:', error);
            }
        }
    };

    const handleEditCommunity = (community: Community) => {
        setNewCommunity({ name: community.name, description: community.description });
        setCurrentCommunity(community);
        setIsEditing(true);
        setShowDialog(true);
    };

    const handleUpdateCommunity = async (id: string) => {
        try {
            const response = await axios.put(`https://bookish.empereur.me/api/community/${id}`, newCommunity, options);
            setCommunities(communities.map(community => (community.communityId === id ? response.data : community)));
            setNewCommunity({ name: '', description: '' });
            setShowDialog(false);
            setIsEditing(false);
            setCurrentCommunity(null);
        } catch (error: any) {
            setError('Error updating the community');
            console.error('Error updating the community:', error);
        }
    };

    const handleDeleteCommunity = async (id: string) => {
        try {
            await axios.delete(`https://bookish.empereur.me/api/community/${id}`, options);
            setCommunities(communities.filter(community => community.communityId !== id));
        } catch (error: any) {
            setError('Error deleting the community');
            console.error('Error deleting the community:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-16">
            <Typography variant="h3" component="h1" gutterBottom>Communities</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
                {communities.map((community) => (
                    <Grid item key={community.communityId} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Link href={`/community/${community.communityId}`} passHref>
                                    <Typography variant="h5" component="a" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {community.name}
                                    </Typography>
                                </Link>
                                <Typography variant="body2">{community.description}</Typography>
                                <IconButton onClick={() => handleEditCommunity(community)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteCommunity(community.communityId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={() => {
                setIsEditing(false);
                setShowDialog(true);
            }}>Add Community</Button>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>{isEditing ? 'Edit Community' : 'Add New Community'}</DialogTitle>
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
                            <Button onClick={() => setShowDialog(false)} color="primary">
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
