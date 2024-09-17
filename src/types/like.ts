// types/like.ts

import { User } from './user';
import { Post } from './post';

// Typage pour un Like
export interface Like {
    id: string;                // Identifiant unique du Like
    userId: string;            // Identifiant de l'utilisateur qui a liké
    postId: string | null;     // Identifiant du post liké (null si c'est un commentaire)
    commentId: string | null;  // Identifiant du commentaire liké (null si c'est un post)
    user: User;                // Informations sur l'utilisateur qui a liké
    post?: Post;               // Informations sur le post (optionnel, présent seulement si postId est défini)
    createdAt: string;         // Date de création du Like
    updatedAt: string;         // Date de dernière mise à jour du Like
}
