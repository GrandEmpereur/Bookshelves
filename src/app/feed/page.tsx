"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, CardActions, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid, Avatar, Fab, createTheme, CssBaseline, ThemeProvider, createMuiTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const apiUrl = 'https://bookish.empereur.me/api';
const token = 'oat_MTQ.X1NqclZidGdPRXBZSENFR3dMOGhldDJ5V1o2aEJna0s2MTAzQzVvMjM1MTU5MTk4NTM';
const userId = 'f8860545-2e10-49a6-9a64-398eeec3f3dc';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const theme = createTheme({
    palette: {
      background: {
        default: '#ffffff'
      },
      primary: {
        main: '#cccccc',
      },
      secondary: {
        main: '#e0e0e0',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      body1: {
        fontWeight: 400,
        color: '#757575',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: '1px solid #eeeeee',
            borderRadius: '10px',
            marginBottom: '16px',
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#f44336',
            color: 'white',
          },
        },
      },
    },
  });
  
const FeedPage = () => {
    const [feeds, setFeeds] = useState<{ 
        feedId: string, 
        title: string, 
        content: string,
        user: {
            userId: string,
            username: string,
            profilePicture: string
        }
      }[]>([]);
    const [error, setError] = useState('');
    const [currentFeed, setCurrentFeed] = useState<{ feedId: string, title: string, content: string, user: { userId: string, username: string, profilePicture: string } } | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isNewPostOpen, setIsNewPostOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', userId: userId, image: null as File | null });

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get(`${apiUrl}/feeds`);
                setFeeds(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des publications');
            }
        };

        fetchFeeds();
    }, []);

    const fetchFeedById = async (feedId: string) => {
        try {
            const response = await axios.get(`${apiUrl}/feed/${feedId}`);
            setCurrentFeed(response.data);
            setIsPopupOpen(true);
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

    const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewPost({ ...newPost, image: e.target.files[0] });
        }
    };

    const createNewPost = async () => {
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        formData.append('userId', newPost.userId);
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
            setIsNewPostOpen(false);
            setNewPost({ title: '', content: '', userId: userId, image: null }); 
        } catch (err) {
            setError('Erreur lors de la création de la publication');
        }
    };

    const updateFeed = async () => {
        if (currentFeed) {
            try {
                await axios.put(`${apiUrl}/feed/${currentFeed.feedId}`, currentFeed);
                setFeeds(feeds.map(feed => (feed.feedId === currentFeed.feedId ? currentFeed : feed)));
                setIsPopupOpen(false);
                setCurrentFeed(null);
            } catch (err) {
                setError('Erreur lors de la mise à jour de la publication');
            }
        }
    };

    const handleCurrentFeedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentFeed) {
            setCurrentFeed({ ...currentFeed, [e.target.name]: e.target.value });
        }
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
                                <Typography variant="h5" component="h2" style={{ cursor: 'pointer', marginTop: '10px' }}>
                                    {feed.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {feed.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton aria-label="comment">
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setIsNewPostOpen(true)}>
                <AddIcon />
            </Fab>

            <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <DialogTitle>Modifier la Publication</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        name="title"
                        value={currentFeed?.title || ''}
                        onChange={handleCurrentFeedChange}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        name="content"
                        value={currentFeed?.content || ''}
                        onChange={handleCurrentFeedChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsPopupOpen(false)} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={updateFeed} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isNewPostOpen} onClose={() => setIsNewPostOpen(false)}>
                <DialogTitle>Nouveau Post</DialogTitle>
                <DialogContent>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar src="https://api.adorable.io/avatars/285/f8860545-2e10-49a6-9a64-398eeec3f3dc.png" />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">Leonardo</Typography>
                            <Typography variant="body2" color="textSecondary">16h</Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        label="Titre"
                        type="text"
                        fullWidth
                        name="title"
                        value={newPost.title}
                        onChange={handleNewPostChange}
                        style={{ marginTop: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        label="Contenu"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        name="content"
                        value={newPost.content}
                        onChange={handleNewPostChange}
                        style={{ marginTop: '16px' }}
                    />
                    <div style={{ marginTop: '16px', border: '1px dashed #ccc', padding: '16px', textAlign: 'center' }}>
                        <CloudUploadIcon style={{ fontSize: '48px', color: '#ccc' }} />
                        <Typography variant="body2">Glisser et déposer une image ici</Typography>
                        <Typography variant="body2">ou</Typography>
                        <Button variant="contained" component="label">
                            Importer
                            <input type="file" hidden onChange={handleImageChange} />
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsNewPostOpen(false)} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={createNewPost} color="primary">
                        Poster
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
         </ThemeProvider>
    );
};

export default FeedPage;
