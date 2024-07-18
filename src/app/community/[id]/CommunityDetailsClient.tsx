"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@/components/ui/button';
import options from "@/lib/api";

import { Plus, PencilLine, LoaderCircle  } from 'lucide-react';

// INTERFACES
import { Community } from '@/interfaces/community';
import { User } from '@/interfaces/user';
import { Feed } from '@/interfaces/feed';
// END INTERFACES

const CommunityDetailsClient: React.FC<{ id: string }> = ({ id }) => {
    const [user, setUser] = useState<User | null>(null);
    const [community, setCommunity] = useState<Community | null>(null);
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [newFeed, setNewFeed] = useState({ title: '', content: '' });
    const [newCommunity, setNewCommunity] = useState({ name: '', description: '' });
    const [showModifyComDialog, setShowModifyComDialog] = useState(false);
    const [showFeedDialog, setShowFeedDialog] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Roles in community
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserCommunity = async () => {
            try {
                const response = await axios.get('https://bookish.empereur.me/auth/me', options);
                setUser(response.data);
                if (response.data.roles.includes(`owner_community_${id}`)) {
                    setIsOwner(true);
                    setIsMember(true);
                }
                if (response.data.roles.includes(`member_community_${id}`)) {
                    setIsMember(true);
                }
            } catch (error: any) {
                setError('Error fetching the user details');
                console.error('Error fetching the user details:', error);
            }
        };

        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`https://bookish.empereur.me/api/community/${id}`, options);
                const userResponse = await axios.get(`https://bookish.empereur.me/api/search/community/users?community_id=${id}`, options);
                const users = userResponse.data.map((user: any) => ({ userId: user.userId, username: user.username }));
                setCommunity({ ...response.data, users });
                setNewCommunity({ name: response.data.name, description: response.data.description });

                const feedResponse = await axios.get(`https://bookish.empereur.me/api/feeds`, options);
                const communityFeeds = feedResponse.data.filter((feed: any) => feed.communityId === id);
                setFeeds(communityFeeds);
            } catch (error: any) {
                setError('Error fetching the community details');
                console.error('Error fetching the community details:', error);
            }
        };

        fetchUserCommunity();
        fetchCommunity();
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFeed({ ...newFeed, [name]: value });
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    const handleAddFeed = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const feedData = {
                community_id: id,
                title: newFeed.title,
                content: newFeed.content
            };

            const response = await axios.post(`https://bookish.empereur.me/api/feed/community/post`, feedData, options);

            setFeeds([...feeds, response.data]);
            setNewFeed({ title: '', content: '' });
            setShowFeedDialog(false); // Close the feed dialog on successful submission
        } catch (error: any) {
            setError('Error posting the feed');
            if (error.response) {
                console.error('Error posting the feed:', error.response.data);
            } else {
                console.error('Error posting the feed:', error.message);
            }
        }
    };

    const handleUpdateCommunity = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const communityData = {
                name: newCommunity.name,
                description: newCommunity.description
            };

            const response = await axios.put(`https://bookish.empereur.me/api/community/${id}`, communityData, options);

            setCommunity({ ...community, ...response.data });
            setShowModifyComDialog(false);
        } catch (error: any) {
            setError('Error updating the community');
            if (error.response) {
                console.error('Error updating the community:', error.response.data);
            } else {
                console.error('Error updating the community:', error.message);
            }
        }
    };

    const handleDeleteCommunity = async () => {
        try {
            await axios.delete(`https://bookish.empereur.me/api/community/${id}`, options);
            window.location.href = '/community';
        } catch (error: any) {
            setError('Error deleting the community');
            console.error('Error deleting the community:', error);
        }
    };

    const handleEditClick = () => {
        if (community) {
            setNewCommunity({ name: community.name, description: community.description });
            setShowModifyComDialog(true);
        }
    };

    const joinCommunity = async () => {
        try {
            const joinCommunitydata = {
                community_id: id
            }
            const response = await axios.post(`https://bookish.empereur.me/api/community/join`, joinCommunitydata, options);
            setIsMember(true);
        } catch (error: any) {
            setError('Error joining the community');
            console.error('Error joining the community:', error);
        }
    };

    const leaveCommunity = async () => {
        try {
            const leaveCommunityData = {
                community_id: id
            }
            const response = await axios.post(`https://bookish.empereur.me/api/community/leave`, leaveCommunityData, options);
            setIsMember(false);
        } catch (error: any) {
            setError('Error leaving the community');
            console.error('Error leaving the community:', error);
        }
    }

    const handleCancelFeed = () => {
        setShowFeedDialog(false);
        setNewFeed({ title: '', content: '' });
        setError(null);
    };

    const handleCancelCommunity = () => {
        setShowModifyComDialog(false);
        setNewCommunity({ name: '', description: '' });
        setError(null);
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!community) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
                {/* <img src="/img/logo_green.png" alt="Loading" className="w-16" /> */}
                <LoaderCircle className="w-16 h-16 animate-spin text-primary-800" />
            </div>
        );
    }

    return (
        <div>

            <div className="relative w-full h-60 flex flex-col gap-4 py-8 px-4 bg-[url('/img/img_cate.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-white opacity-50 "></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
                <div className="relative flex flex-col gap-4">

                    <div className='flex justify-between items-center gap-2'>
                        <h1 className="h1">{community.name}</h1>
                        {isOwner && (
                            <PencilLine className="h-5 w-5" onClick={() => setShowModifyComDialog(true)}/>
                        )}
                    </div>

                    <p>{community.description}</p>
                    {!isOwner && (
                        isMember ? (
                            <Button variant="default" size="sm" onClick={leaveCommunity}>Quitter</Button>
                        ) : (
                            <Button variant="default" size="sm" onClick={joinCommunity}>Rejoindre</Button>
                        )
                    )}
                </div>
            </div>

            <div className='p-4 flex flex-col gap-4'>

                <div className='body-3 flex justify-between'>
                    <div>
                        <p className='font-semibold'>Modéré par</p>
                        <p>(Nom)</p>
                    </div>

                    <p className='font-semibold'>{community.users.length} {community.users.length > 1 ? ' membres' : ' membre'}</p>

                    {/* Afficher par la suite les photos de profils */}
                    {/* {community.users.map((user) => (
                     <p key={user.userId}>{user.username}</p>
                ))} */}
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='h2'>Publications</h2>
                        {isMember && (
                        <Plus className="h-5 w-5" onClick={() => setShowFeedDialog(true)}/>
                        )}
                    </div>

                    {!isMember && (
                    <p className='disclaimer'>Vous devez rejoindre la communauté pour pouvoir poster.</p>
                    )}

                    {feeds.length > 0 ? (
                        <Grid container spacing={2}>
                            {feeds.map((feed) => (
                                <Grid item key={feed.feedId} xs={12} sm={6} md={4} lg={3}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5">{feed.title}</Typography>
                                            <Typography variant="body2">{feed.content}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <p className='disclaimer'>Il n'y a pas de publications pour le moment.</p>
                    )}
                </div>

                

                {isMember && (
                    <div>
                        <Dialog open={showFeedDialog} onClose={handleCancelFeed}>
                            <DialogTitle>Nouvelle publication</DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleAddFeed}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Titre"
                                        type="text"
                                        fullWidth
                                        name="title"
                                        value={newFeed.title}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Contenu"
                                        type="text"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="content"
                                        value={newFeed.content}
                                        onChange={handleInputChange}
                                    />
                                    <DialogActions>
                                        <Button type="button" onClick={handleCancelFeed} color="primary">
                                            Annuler
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Publier
                                        </Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}

                {isOwner && (
                    <Dialog open={showModifyComDialog} onClose={handleCancelCommunity}>
                        <DialogTitle>Modifier la comunauté</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleUpdateCommunity}>
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
                        <p onClick={handleDeleteCommunity}>Supprimer la comunauté</p>
                              
                                <DialogActions>
                                    <Button type="button" onClick={handleCancelCommunity} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Save
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}

            </div>
        </div>
    );
};

export default CommunityDetailsClient;
