"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@/components/ui/button';
import options from '../../api';

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
    const [showDialog, setShowDialog] = useState(false);
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
                console.log(response.data.roles);
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

            console.log('Sending feed data:', feedData);

            const response = await axios.post(`https://bookish.empereur.me/api/feed/community/post`, feedData, options);
            console.log('Response from server:', response.data);

            setFeeds([...feeds, response.data]);
            setNewFeed({ title: '', content: '' });
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
            console.log('Sending community data:', communityData);

            const response = await axios.put(`https://bookish.empereur.me/api/community/${id}`, communityData, options);
            console.log('Response from server:', response.data);

            setCommunity({ ...community, ...response.data });
            setShowDialog(false);
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
            setShowDialog(true);
        }
    };

    const joinCommunity = async () => {
        try{
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
        try{
            const leaveCommunityData = {
                community_id: id
            }
            const response = await axios.post(`https://bookish.empereur.me/api/community/leave`, leaveCommunityData, options);
            setIsMember(false);
        } catch(error:any){
            setError('Error leaving the community');
            console.error('Error leaving the community:', error);
        }
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!community) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>

        <div className="relative w-full h-60 flex flex-col gap-4 py-10 px-4 bg-[url('/img/img_cate.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-white opacity-50 "></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
            <div className="relative">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold">{community.name}</h1>
                    {isMember ? (
                    <Button variant="default" size="sm" onClick={leaveCommunity}>Leave</Button>
                    ): (
                    <Button variant="default" size="sm" onClick={joinCommunity}>Join</Button>
                    )} 
                </div>

                <p>{community.description}</p>
            </div>
        </div>



        <div className="container mx-auto px-4 py-8 flex flex-col gap-16">

            <Typography variant="h4" component="h2" gutterBottom>Users</Typography>
            <Grid container spacing={2}>
                {community.users.map((user) => (
                    <Grid item key={user.userId} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{user.username}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" component="h2" gutterBottom>Feeds</Typography>

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
                <Typography variant="body2">Il n'y a pas de publications pour le moment.</Typography>
            )}
            

            {isMember && ( 
                <div>
            <Typography variant="h4" component="h2" gutterBottom>Add Feed</Typography>
            <form onSubmit={handleAddFeed}>
                <TextField
                    name="title"
                    label="Title"
                    value={newFeed.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="content"
                    label="Content"
                    value={newFeed.content}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">Add Feed</Button>
            </form>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>Edit Community</DialogTitle>
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
            )}

        </div>
        </div>
    );
};

export default CommunityDetailsClient;
