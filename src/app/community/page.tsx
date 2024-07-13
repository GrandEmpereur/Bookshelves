"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TextField, Button, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={() => {
                setShowDialog(true);
            }}>Add Community</Button>
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
