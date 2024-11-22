"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { searchUsers } from "@/services/searchService";
import { searchBooks } from "@/services/bookService";
import { User } from "@/types/user";
import { Book } from "@/types/book";

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            fetchResults(debouncedQuery);
            addSuggestion(debouncedQuery);
        }
    }, [debouncedQuery]);

    const fetchResults = async (searchValue: string) => {
        if (searchValue.length < 2) {
            setUser(null);
            setBooks([]);
            return;
        }

        setLoading(true);
        setLoginError(null);

        try {

            const users = await searchUsers(searchValue);
            const foundUser = users.find((user) =>
                user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase())
            );

            if (foundUser) {
                setUser(foundUser);
                console.log("Utilisateur trouvé:", foundUser);


                if (foundUser.role === "AUTHOR") {
                    try {
                        const allBooks = await searchBooks();
                        console.log("Livres récupérés:", allBooks);


                        const filteredBooks = allBooks.filter((book) => {
                            return normalizeName(book.author) === normalizeName(foundUser.username);
                        });

                        console.log("Livres filtrés:", filteredBooks);
                        setBooks(filteredBooks);
                    } catch (error) {
                        console.error("Erreur lors de la récupération ou du filtrage des livres:", error);
                        setLoginError("Une erreur est survenue lors de la récupération des livres.");
                    }
                }
            } else {

                try {
                    const allBooks = await searchBooks();


                    const filteredBooks = allBooks.filter((book) => {
                        const matchesTitle = book.title.toLowerCase().includes(searchValue.toLowerCase());
                        const matchesGenre = book.genre.toLowerCase().includes(searchValue.toLowerCase());

                        return matchesTitle || matchesGenre;
                    });

                    console.log("Livres filtrés par titre/genre:", filteredBooks);
                    setBooks(filteredBooks);
                } catch (error) {
                    console.error("Erreur lors de la recherche de livres par titre ou genre:", error);
                    setLoginError("Une erreur est survenue lors de la recherche de livres.");
                }
            }
        } catch (error) {
            setLoginError("Une erreur est survenue lors de la recherche.");
        } finally {
            setLoading(false);
        }
    };


    const normalizeName = (name: string) => {
        return name.trim().replace(/\s+/g, '').toLowerCase();
    };

    // Ajouter une suggestion uniquement si elle est unique
    const addSuggestion = (searchValue: string) => {
        setSuggestions((prevSuggestions) => {
            if (!prevSuggestions.includes(searchValue)) {
                return [...prevSuggestions, searchValue];
            }
            return prevSuggestions;
        });
    };


    const removeSuggestion = (suggestionToRemove: string) => {
        setSuggestions((prevSuggestions) => {
            return prevSuggestions.filter((suggestion) => suggestion !== suggestionToRemove);
        });
    };


    const clearSuggestions = () => {
        setSuggestions([]);
    };

    return (
        <div className="relative flex flex-col gap-6 px-4">
            {/* Barre de recherche unique */}
            <div className="flex gap-4 relative">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher par utilisateur, titre ou genre..."
                />
                {suggestions.length > 0 && (
                    <button
                        onClick={clearSuggestions}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <span>&#10005;</span> {}
                    </button>
                )}
            </div>
            {loginError && <p className="text-error text-center">{loginError}</p>}
               {suggestions.length > 0 && (
                                       <div className="mt-6">
                                           <h3 className="font-semibold">Suggestions :</h3>
                                           <ul>
                                               {suggestions.map((suggestion, index) => (
                                                   <li key={index} className="py-2 flex justify-between items-center">
                                                       <span>{suggestion}</span>
                                                       <button
                                                           onClick={() => removeSuggestion(suggestion)}
                                                           className="text-red-500 ml-2"
                                                       >
                                                           &#10005; {/* Croissant pour supprimer */}
                                                       </button>
                                                   </li>
                                               ))}
                                           </ul>
                                       </div>
                                   )}
            {loading ? (
                <div className="flex flex-col gap-6">
                    <Skeleton className="w-full h-10 mb-4 rounded" />
                    <Skeleton className="w-full h-6 mb-2 rounded" />
                    <Skeleton className="w-full h-40 mb-4 rounded" />
                    <Skeleton className="w-full h-10 mb-4 rounded" />
                </div>
            ) : (
                <div className="flex flex-col gap-y-6">
                    {/* Affichage des résultats */}
                    {user ? (
                        <div key={user.id} className="flex flex-col gap-4 p-4 border rounded-md">
                            <div className="flex items-center">
                                <h2 className="font-bold">{user.username}</h2>
                                {user.profilePicture && (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.username}
                                        className="w-10 h-10 rounded-full ml-4"
                                    />
                                )}
                            </div>
                            {user.firstName && user.lastName && (
                                <p>{user.firstName} {user.lastName}</p>
                            )}
                            {user.role === "AUTHOR" && (
                                <div className="mt-4">
                                    <h3 className="font-semibold">Livres associés:</h3>
                                    {books.length > 0 ? (
                                        books.map((book) => (
                                            <div key={book.id} className="flex flex-col gap-2 p-4 border rounded-md mt-4">
                                                {book.coverImage && (
                                                    <img
                                                        src={book.coverImage}
                                                        alt={book.title}
                                                        className="w-32 h-48 object-cover"
                                                    />
                                                )}
                                                <h4 className="font-bold">{book.title}</h4>
                                                <p>{book.genre} - {book.publicationYear}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucun livre trouvé pour cet auteur.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        query && books.length > 0 ? (
                            <div>
                                <h3 className="font-semibold">Livres trouvés:</h3>
                                {books.map((book) => (
                                    <div key={book.id} className="flex flex-col gap-2 p-4 border rounded-md mt-4">
                                        {book.coverImage && (
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-32 h-48 object-cover"
                                            />
                                        )}
                                        <h4 className="font-bold">{book.title}</h4>
                                        <p>{book.genre} - {book.publicationYear}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            query && !loading && <p>Aucun résultat trouvé pour "{query}".</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
