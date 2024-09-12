// types/auth.ts

// Typage pour l'utilisateur en fonction de la structure Adonis.js
export interface User {
    username: string;
    email: string;
    birth_date: string;
    password: string;
}

// Réponse pour l'authentification (login, register)
export interface AuthResponse {
    user: User;
}

// Typage pour les erreurs API
export interface ApiError {
    message: string;
    code?: string;
}
