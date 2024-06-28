"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Avatar, Card, CardMedia, Typography, Grid } from '@mui/material';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface Book {
    statId: string;
    bookTitle: string;
}

const SearchPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = 'oat_MjI.ZkJBUEhfS3dCVU9HOEFweXdubV9ONnJnT01fanpNWVdicXUwUHNsMjM5Njg0OTk0Nzc';
                const response = await axios.get('https://bookish.empereur.me/api/search/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Erreur lors de la récupération des utilisateurs :', axiosError.response?.data);
                setIsLoading(false);
            }
        };

        const fetchBooks = async () => {
            try {
                const token = 'oat_MTI.NmJNNFFIZ2gwRmlnT2kwUXNiX1d1SEozeTRZcW9hUXF6WTlhN1lWRTQwMzMwNTcyODQ';
                const response = await axios.get('https://bookish.empereur.me/api/reading-stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setBooks(response.data.map((book: any) => ({ statId: book.statId, bookTitle: book.bookTitle })));
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Erreur lors de la récupération des livres :', axiosError.response?.data);
            }
        };

        fetchUsers();
        fetchBooks();
    }, []);

    const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchTerm(query);

        try {
            const token = 'oat_Nw.NlpRNVkxWS12OEIyd1VNT0FpQnVuOGNrWlM4RXVDX0k0WV9nOEJoNzIwNjUwOTkwMjI';
            const response = await axios.get(`https://bookish.empereur.me/api/search/users?query=${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setFilteredUsers(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erreur lors de la récupération des utilisateurs :', axiosError.response?.data);
        }
    };

    if (isLoading) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <div style={{ fontFamily: 'Roboto, sans-serif', padding: '20px' }}>
            <Typography variant="h3" component="h1" gutterBottom>Search</Typography>
            <TextField
                label="Rechercher par nom d'auteur..."
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: '600px', marginBottom: '20px' }}
            />
            <Typography variant="h5" component="h3" gutterBottom>Famous authors</Typography>
            <Grid container spacing={2}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <Grid item key={user.userId} xs={12} sm={6} md={4} lg={3}>
                            <div style={{ textAlign: 'center' }}>
                                {user.profilePicture && (
                                    <Avatar
                                        src={user.profilePicture}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                    />
                                )}
                                <Typography variant="body1">{user.firstName} {user.lastName}</Typography>
                            </div>
                        </Grid>
                    ))
                ) : (
                    users.map(user => (
                        <Grid item key={user.userId} xs={12} sm={6} md={4} lg={3}>
                            <div style={{ textAlign: 'center' }}>
                                {user.profilePicture && (
                                    <Avatar
                                        src={user.profilePicture}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                    />
                                )}
                                <Typography variant="body1">{user.firstName} {user.lastName}</Typography>
                            </div>
                        </Grid>
                    ))
                )}
            </Grid>
            <Typography variant="h5" component="h3" gutterBottom style={{ marginTop: '40px' }}>Trending Books</Typography>
            <Grid container spacing={2}>
                {books.map(book => (
                    <Grid item key={book.statId} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={book.bookTitle}
                                alt="Book Image"
                                style={{ height: '300px' }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SearchPage;
