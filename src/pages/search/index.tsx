import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);

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

    const handleSearchChange = async (event) => {
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
        <div>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Rechercher par nom d'auteur..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <h3>Famous authors</h3>
            <ul>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li key={user.userId}>
                            <div>
                                <p>FirstName: {user.firstName}</p>
                                <p>LastName: {user.lastName}</p>
                                {user.profilePicture && <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px' }} />}
                            </div>
                        </li>
                    ))
                ) : (
                    users.map(user => (
                        <li key={user.userId}>
                            <div>
                                <p>FirstName: {user.firstName}</p>
                                <p>LastName: {user.lastName}</p>
                                {user.profilePicture && <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px' }} />}
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
