"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import options from '../../api';

interface User {
    userId: string;
    username: string;
}

interface Community {
    communityId: string;
    name: string;
    description: string;
    users: User[];
}

interface Feed {
    feedId: string;
    title: string;
    content: string;
    communityId: string;
}

const CommunityDetailsClient: React.FC<{ id: string }> = ({ id }) => {
    const [community, setCommunity] = useState<Community | null>(null);
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [newFeed, setNewFeed] = useState({ title: '', content: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchCommunity = async () => {
                try {
                    const response = await axios.get(`https://bookish.empereur.me/api/community?id=${id}`, options);
                    const userResponse = await axios.get(`https://bookish.empereur.me/api/search/community/users?community_id=${id}`, options);
                    const users = userResponse.data.map((user: any) => ({ userId: user.userId, username: user.username }));
                    setCommunity({ ...response.data, users });

                    const feedResponse = await axios.get(`https://bookish.empereur.me/api/feeds`, options);
                    const communityFeeds = feedResponse.data.filter((feed: any) => feed.communityId === id);
                    setFeeds(communityFeeds);
                } catch (error: any) {
                    setError('Error fetching the community details');
                    console.error('Error fetching the community details:', error);
                }
            };

            fetchCommunity();
        }
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFeed({ ...newFeed, [name]: value });
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

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!community) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-16">
            <Typography variant="h3" component="h1" gutterBottom>{community.name}</Typography>
            <Typography variant="body2">{community.description}</Typography>
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
        </div>
    );
};

export default CommunityDetailsClient;
