"use client";

import withAuth from '@/components/withAuth';
import { User } from '@/context/userContext';
import { createFeedSchema } from '@/services/validationSchema';
import {
  Add as AddIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon, CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon, Favorite as FavoriteIcon
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  createTheme, CssBaseline,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Fab,
  Grid,
  IconButton,
  List, ListItem, ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import { useUser } from '../../context/userContext';
import api from '../../services/api';

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
  const { user } = useUser();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [currentFeed, setCurrentFeed] = useState<Feed | null>(null);
  const [showFeedDialog, setShowFeedDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const response = await api.get('api/feeds');
      const feeds: Feed[] = response.data.map((feed: Feed) => ({
        ...feed,
        isLiked: feed.isLiked || false,
        likeCount: feed.likeCount || 0,
        comments: feed.comments || []
      }));
      setFeeds(feeds);
    } catch (err) {
      setError('Error retrieving posts');
    }
  };

  const likeStatus = async (feedId: string) => {
    try {
      const response = await api.get(`api/feeds/${feedId}/likes`);
      const { isLiked, likeCount } = response.data;
      setFeeds(feeds.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, isLiked, likeCount };
        }
        return feed;
      }));
    } catch (err) {
      setError('Error fetching like status');
    }
  };

  const fetchFeedById = async (feedId: string) => {
    try {
      const response = await api.get(`api/feed/${feedId}`);
      setCurrentFeed(response.data);
      setShowFeedDialog(true);
    } catch (err) {
      setError('Error retrieving the post');
    }
  };

  const deleteFeed = async (feedId: string) => {
    try {
      await api.delete(`api/feed/${feedId}`);
      setFeeds(feeds.filter(feed => feed.feedId !== feedId));
    } catch (err) {
      setError('Error deleting the post');
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
      const response = await api.put(`api/feed/${feedId}`, { title, content });
      setFeeds(feeds.map(feed => (feed.feedId === feedId ? { ...response.data, comments: feed.comments, likeCount: feed.likeCount, isLiked: feed.isLiked } : feed)));
      setShowFeedDialog(false);
    } catch (err) {
      setError('Error saving the post');
    }
  };

  const createNewFeed = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newFeed = {
        title: newPost.title,
        content: newPost.content,
        user_id: user?.userId
      };
  
      createFeedSchema.parse(newFeed);
  
      const response = await api.post('api/feed', newFeed);
  
      setFeeds([...feeds, response.data]);
      setNewPost({ title: '', content: '' });
      setShowFeedDialog(false);
    } catch (err) {
      setError('Could not create new feed');
    }
  };
  

  const likePost = async (feedId: string) => {
    try {
      await api.post(`api/feeds/${feedId}/likes`);
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
      await api.delete(`api/feeds/${feedId}/likes`);
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
      const response = await api.get(`api/feeds/${feedId}/comments`);
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
      const response = await api.post(`api/feeds/${feedId}/comments`, { content });
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
      await api.delete(`api/feeds/${feedId}/comments/${commentId}`);
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
    setNewPost({ title: '', content: '' });
    setShowFeedDialog(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPost({ ...newPost });
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
                    <form onSubmit={createNewFeed}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            name="title"
                            value={newPost.title}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                        <DialogActions>
                            <Button onClick={() => setShowFeedDialog(false)} color="primary">
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

export default withAuth(FeedPage);
