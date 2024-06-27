"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

const SearchPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = 'oat_Nw.NlpRNVkxWS12OEIyd1VNT0FpQnVuOGNrWlM4RXVDX0k0WV9nOEJoNzIwNjUwOTkwMjI';
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
                console.error('Erreur lors de la récupération des utilisateurs :', error.response.data);
                setIsLoading(false);
            }
        };

        fetchUsers();
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
            console.error('Erreur lors de la récupération des utilisateurs :', error.response.data);
        }
    };

    if (isLoading) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <div style={{ fontFamily: 'Roboto, sans-serif' }}>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Rechercher par nom d'auteur..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <h3>Famous authors</h3>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li key={user.userId} style={{ margin: '10px' }}>
                            <div style={{ textAlign: 'center' }}>
                                {user.profilePicture && (
                                    <img
                                        src={user.profilePicture}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                                <p>{user.firstName}</p>
                                <p>{user.lastName}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    users.map(user => (
                        <li key={user.userId} style={{ margin: '10px' }}>
                            <div style={{ textAlign: 'center' }}>
                                {user.profilePicture && (
                                    <img
                                        src={user.profilePicture}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                                <p>{user.firstName}</p>
                                <p>{user.lastName}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <h3>Trending Books</h3>
        </div>
    );
};

export default SearchPage;
