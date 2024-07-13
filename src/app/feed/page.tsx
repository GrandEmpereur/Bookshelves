"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Card, CardContent, CardActions, Typography, Button, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid, Avatar,
    Fab, createTheme, CssBaseline, ThemeProvider, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import {
    Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon, Favorite as FavoriteIcon,
    Share as ShareIcon, ChatBubbleOutline as ChatBubbleOutlineIcon, CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const apiUrl = 'https://bookish.empereur.me/api';
const token = 'oat_MTQ.X1NqclZidGdPRXBZSENFR3dMOGhldDJ5V1o2aEJna0s2MTAzQzVvMjM1MTU5MTk4NTM';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const theme = createTheme({
    palette: {
        background: {
            default: '#f4f6f8'
        },
        primary: {
            main: '#005ea2',
        },
        secondary: {
            main: '#d32f2f',
        },
        info: {
            main: '#0288d1'
        }
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    backgroundColor: '#005ea2',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#004175',
                    },
                },
            },
        },
    },
});

interface User {
    userId: string;
    username: string;
    profilePicture: string;
}

interface Comment {
    commentId: string;
    content: string;
    user: User;
}

interface Feed {
    feedId: string;
    title: string;
    content: string;
    user: User;
    likeCount: number;
    isLiked: boolean;
    comments: Comment[];
}

const FeedPage = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [currentFeed, setCurrentFeed] = useState<Feed | null>(null);
    const [showFeedDialog, setShowFeedDialog] = useState(false);
    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [newPost, setNewPost] = useState({ title: '', content: '', image: null as File | null });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        try {
            const response = await axios.get(`${apiUrl}/feeds`);
            const feeds: Feed[] = response.data.map((feed: Feed) => ({
                ...feed,
                isLiked: false,
                likeCount: feed.likeCount || 0,
                comments: feed.comments || []
            }));
            setFeeds(feeds);
        } catch (err) {
            setError('Error retrieving posts');
        }
    };

    const fetchFeedById = async (feedId: string) => {
        try {
            const response = await axios.get(`${apiUrl}/feed/${feedId}`);
            setCurrentFeed(response.data);
            setShowFeedDialog(true);
        } catch (err) {
            setError('Erreur lors de la récupération de la publication');
        }
    };

    const deleteFeed = async (feedId: string) => {
        try {
            await axios.delete(`${apiUrl}/feed/${feedId}`);
            setFeeds(feeds.filter(feed => feed.feedId !== feedId));
        } catch (err) {
            setError('Erreur lors de la suppression de la publication');
        }
    };

    const handleFeedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentFeed) {
            setCurrentFeed({ ...currentFeed, [e.target.name]: e.target.value });
        }
    };

    const saveFeed = async () => {
        if (!currentFeed) return;
        try {
            const { feedId, title, content } = currentFeed;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            if (newPost.image) {
                formData.append('image', newPost.image);
            }
            const response = await axios.put(`${apiUrl}/feed/${feedId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFeeds(feeds.map(feed => (feed.feedId === feedId ? { ...response.data, comments: feed.comments, likeCount: feed.likeCount, isLiked: feed.isLiked } : feed)));
            setShowFeedDialog(false);
        } catch (err) {
            setError('Error saving the feed');
        }
    };

    const createNewFeed = async () => {
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        if (newPost.image) {
            formData.append('image', newPost.image);
        }
        try {
            const response = await axios.post(`${apiUrl}/feed`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFeeds([...feeds, response.data]);
            setShowFeedDialog(false);
            setNewPost({ title: '', content: '', image: null });
        } catch (err) {
            setError('Error creating the feed');
        }
    };

    const likePost = async (feedId: string) => {
        try {
            await axios.post(`${apiUrl}/feeds/${feedId}/likes`);
            setFeeds(feeds.map(feed => {
                if (feed.feedId === feedId) {
                    return {
                        ...feed,
                        isLiked: true,
                        likeCount: feed.likeCount + 1
                    };
                }
                return feed;
            }));
        } catch (err) {
            setError('Could not like post');
        }
    };

    const unlikePost = async (feedId: string) => {
        try {
            await axios.delete(`${apiUrl}/feeds/${feedId}/likes`);
            setFeeds(feeds.map(feed => {
                if (feed.feedId === feedId) {
                    return {
                        ...feed,
                        isLiked: false,
                        likeCount: feed.likeCount - 1
                    };
                }
                return feed;
            }));
        } catch (err) {
            setError('Could not unlike post');
        }
    };

    const fetchComments = async (feedId: string) => {
        try {
            const response = await axios.get(`${apiUrl}/feeds/${feedId}/comments`);
            setFeeds(feeds.map(feed => {
                if (feed.feedId === feedId) {
                    return { ...feed, comments: response.data };
                }
                return feed;
            }));
        } catch (err) {
            setError('Could not fetch comments');
        }
    };

    const addComment = async (feedId: string, content: string) => {
        try {
            const response = await axios.post(`${apiUrl}/feeds/${feedId}/comments`, { content });
            setFeeds(feeds.map(feed => {
                if (feed.feedId === feedId) {
                    return { ...feed, comments: [...feed.comments, response.data] };
                }
                return feed;
            }));
            setNewComment('');
            setShowCommentDialog(false);
        } catch (err) {
            setError('Could not add comment');
        }
    };

    const deleteComment = async (feedId: string, commentId: string) => {
        console.log(`Deleting comment with ID: ${commentId} from feed with ID: ${feedId}`);
        try {
            await axios.delete(`${apiUrl}/feeds/${feedId}/comments/${commentId}`);
            setFeeds(feeds.map(feed => {
                if (feed.feedId === feedId) {
                    return {
                        ...feed,
                        comments: feed.comments.filter(comment => comment.commentId !== commentId)
                    };
                }
                return feed;
            }));
        } catch (err) {
            setError('Could not delete comment');
        }
    };
    

    const openNewFeedDialog = () => {
        setCurrentFeed(null);
        setNewPost({ title: '', content: '', image: null });
        setShowFeedDialog(true);
    };

    const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewPost({ ...newPost, image: e.target.files[0] });
        }
    };

    const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const openCommentDialog = (feed: Feed) => {
        setCurrentFeed(feed);
        setShowCommentDialog(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Liste des Publications
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Grid container spacing={3}>
                    {feeds.map(feed => (
                        <Grid item xs={12} key={feed.feedId}>
                            <Card>
                                <CardContent>
                                    <Grid container alignItems="center">
                                        <Avatar src={feed.user.profilePicture} />
                                        <Grid item xs>
                                            <Typography variant="h6" style={{ marginLeft: '10px' }}>
                                                {feed.user.username}
                                            </Typography>
                                        </Grid>
                                        <IconButton color="primary" onClick={() => fetchFeedById(feed.feedId)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => deleteFeed(feed.feedId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Typography variant="h5" component="h2" style={{ cursor: 'pointer', marginTop: '10px' }} onClick={() => fetchComments(feed.feedId)}>
                                        {feed.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {feed.content}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="Like" onClick={() => feed.isLiked ? unlikePost(feed.feedId) : likePost(feed.feedId)}>
                                        <FavoriteIcon color={feed.isLiked ? "error" : "inherit"} />
                                        <Typography variant="caption">{feed.likeCount}</Typography>
                                    </IconButton>
                                    <IconButton aria-label="comment" onClick={() => openCommentDialog(feed)}>
                                        <ChatBubbleOutlineIcon />
                                    </IconButton>
                                </CardActions>
                                <List>
    {feed.comments.map(comment => (
        <ListItem key={comment.commentId}>
            <ListItemAvatar>
                <Avatar src={comment.user.profilePicture} />
            </ListItemAvatar>
            <ListItemText primary={comment.user.username} secondary={comment.content} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteComment(feed.feedId, comment.commentId)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    ))}
</List>

                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={openNewFeedDialog}>
                    <AddIcon />
                </Fab>

                {!currentFeed && (
                    <Dialog open={showFeedDialog} onClose={() => setShowFeedDialog(false)}>
                        <DialogTitle>New Feed</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Title"
                                type="text"
                                fullWidth
                                name="title"
                                value={newPost.title}
                                onChange={handleNewPostChange}
                            />
                            <TextField
                                margin="dense"
                                label="Content"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                name="content"
                                value={newPost.content}
                                onChange={handleNewPostChange}
                            />
                            <div style={{ marginTop: '16px', border: '1px dashed #ccc', padding: '16px', textAlign: 'center' }}>
                                <CloudUploadIcon style={{ fontSize: '48px', color: '#ccc' }} />
                                <Typography variant="body2">Drag and drop an image here</Typography>
                                <Typography variant="body2">or</Typography>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input type="file" hidden onChange={handleImageChange} />
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowFeedDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={createNewFeed} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                {currentFeed && (
                    <Dialog open={showFeedDialog} onClose={() => setShowFeedDialog(false)}>
                        <DialogTitle>Edit Feed</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Title"
                                type="text"
                                fullWidth
                                name="title"
                                value={currentFeed.title}
                                onChange={handleFeedChange}
                            />
                            <TextField
                                margin="dense"
                                label="Content"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                name="content"
                                value={currentFeed.content}
                                onChange={handleFeedChange}
                            />
                            <div style={{ marginTop: '16px', border: '1px dashed #ccc', padding: '16px', textAlign: 'center' }}>
                                <CloudUploadIcon style={{ fontSize: '48px', color: '#ccc' }} />
                                <Typography variant="body2">Drag and drop an image here</Typography>
                                <Typography variant="body2">or</Typography>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input type="file" hidden onChange={handleImageChange} />
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowFeedDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={saveFeed} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}


                <Dialog open={showCommentDialog} onClose={() => setShowCommentDialog(false)}>
                    <DialogTitle>Add a Comment</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            value={newComment}
                            onChange={handleCommentInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowCommentDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => addComment(currentFeed?.feedId || '', newComment)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </ThemeProvider>
    );
};

export default FeedPage;
