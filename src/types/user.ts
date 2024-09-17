// types/user.ts

// Typage pour un utilisateur
export interface User {
    data: {
        id: string;                     // Identifiant unique de l'utilisateur
        username: string;               // Nom d'utilisateur
        email: string;                  // Adresse e-mail de l'utilisateur
        bio: string | null;             // Biographie de l'utilisateur, peut être null si non définie
        profile_picture: string | null;  // URL de la photo de profil de l'utilisateur, peut être null si non définie
        birth_date: string;
        role: string;                   // Rôle de l'utilisateur (ex. "USER", "ADMIN")
        isVerified: boolean;            // Indique si l'utilisateur est vérifié
        hasLoggedIn: boolean;           // Indique si l'utilisateur s'est connecté au moins une fois
        createdAt: string;              // Date de création du compte utilisateur
    }
}
