import { useEffect, useState } from 'react';

interface User {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  roles: string[];
}

interface ReadingStats {
  statId: string;
  userId: string;
  bookTitle: string;
  pagesRead: number;
  totalPages: number;
  createdAt: string;
  updatedAt: string;
}

const Search: React.FC = () => {
  const [authors, setAuthors] = useState<User[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<User[]>([]);
  const [readingStats, setReadingStats] = useState<ReadingStats[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://bookish.empereur.me/api/search/users?roles=auteur', {
          headers: {
            'Authorization': 'Bearer oat_MTY.TEhFMkNpLVpvYzdER2VjWUZYTHBzTFlqNUo3ejFubllfOHdycjBnbjk2MTExMTc3',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Authors data:', data); // Log des données reçues

        if (data && Array.isArray(data.users)) {
          const filteredUsers = data.users.filter((user: User) => user.roles.includes('auteur'));
          setAuthors(filteredUsers);
          setFilteredAuthors(filteredUsers);
        } else {
          console.error('Unexpected API response structure:', data);
          throw new Error('API response does not contain expected data');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchReadingStats = async () => {
      try {
        const response = await fetch('https://bookish.empereur.me/api/reading-stats', {
          headers: {
            'Authorization': 'Bearer oat_MTY.TEhFMkNpLVpvYzdER2VjWUZYTHBzTFlqNUo3ejFubllfOHdycjBnbjk2MTExMTc3',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Reading stats data:', data); // Log des données reçues

        if (data && Array.isArray(data)) {
          setReadingStats(data);
        } else {
          console.error('Unexpected API response structure:', data);
          throw new Error('API response does not contain expected data');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching reading stats:', error);
      }
    };

    fetchReadingStats();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredAuthors = authors.filter(author =>
      (author.firstName && author.firstName.toLowerCase().includes(searchTerm)) ||
      (author.lastName && author.lastName.toLowerCase().includes(searchTerm))
    );
    setFilteredAuthors(filteredAuthors);
  };

  return (
    <div>
      <h1>Search</h1>
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      <input
        type="text"
        placeholder="Rechercher un auteur par nom ou prénom"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      <h2>Famous Authors</h2>
      <div className="authors-list">
        {filteredAuthors.map(author => (
          <div key={author.userId} className="author-card">
            <img src={author.profilePicture || 'default-profile-picture-url'} alt={`${author.firstName} ${author.lastName}`} />
            <h2>{author.firstName} {author.lastName}</h2>
          </div>
        ))}
      </div>
      <h2>Trending Books</h2>
      <div className="books-list">
        {readingStats.map(stat => (
          <img
            key={stat.statId}
            src={stat.bookTitle}
            alt="Book Cover"
            style={{ width: '150px', height: '150px', margin: '5px' }}
            onError={(e) => { e.currentTarget.src = 'default-book-cover-url'; }} // Image de remplacement en cas d'erreur
          />
        ))}
      </div>
      <style jsx>{`

      * {
          font-family: 'Poppins', sans-serif;
       }
        .authors-list {
          display: flex;
          flex-wrap: wrap;
        }
        .author-card {
          margin: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
        }
        .author-card img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Search;
