// types/post.ts

// Typage pour les médias associés aux posts
export interface Media {
    type: 'image' | 'video'; // Type de média, soit une image soit une vidéo
    url: string;             // URL du média
}

// Typage pour la création d'un post
export interface CreatePost {
    title: string;          // Titre du post
    subject: string;        // Sujet du post
    content: string;        // Contenu du post
    media: Media[];         // Liste des médias associés au post
}

// Typage pour la mise à jour d'un post
export interface UpdatePost {
    title: string;          // Titre mis à jour du post
    subject: string;        // Sujet mis à jour du post
    content: string;        // Contenu mis à jour du post
    media: Media[];         // Liste mise à jour des médias associés au post
}

// Typage principal pour un post (lecture complète des données d'un post)
export interface Post {
    id: string;              // Identifiant unique du post
    title: string;           // Titre du post
    subject: string;         // Sujet du post
    content: string;         // Contenu du post
    userId: string;          // Identifiant de l'utilisateur qui a créé le post
    likesCount: number;      // Nombre de likes sur le post
    commentsCount: number;   // Nombre de commentaires sur le post
    createdAt: string;       // Date de création du post
    updatedAt: string;       // Date de dernière mise à jour du post
    user: User;              // Informations sur l'utilisateur
    media: Media[];          // Liste des médias associés au post
    isLiked: boolean;        // Indique si l'utilisateur a liké le post
    isFavorited: boolean;    // Indique si le post est dans les favoris de l'utilisateur
}

// Typage pour l'utilisateur
export interface User {
    id: string;              // Identifiant unique de l'utilisateur
    username: string;        // Nom d'utilisateur
    email: string;           // Adresse email de l'utilisateur
    bio: string | null;      // Biographie de l'utilisateur
    profilePicture: string | null; // URL de la photo de profil de l'utilisateur
}

// Typage pour une réponse API générique
export interface ApiResponse<T> {
    status: string;          // Statut de la réponse (ex: "success" ou "error")
    message: string;         // Message de la réponse
    data: T;                 // Données renvoyées par l'API
}

// Typage pour les erreurs API
export interface ApiError {
    message: string;         // Message d'erreur
    code?: string;           // Code d'erreur optionnel
}
