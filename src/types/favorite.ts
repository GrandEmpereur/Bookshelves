// types/favorite.ts

import { User } from './user';
import { Post } from './post';

// Typage pour un Favorite
export interface Favorite {
    id: string;           // Identifiant unique du Favorite
    userId: string;       // Identifiant de l'utilisateur qui a ajouté aux favoris
    postId: string;       // Identifiant du post mis en favoris
    user: User;           // Informations sur l'utilisateur qui a ajouté aux favoris
    post: Post;           // Informations sur le post mis en favoris
    createdAt: string;    // Date de création du Favorite
    updatedAt: string;    // Date de dernière mise à jour du Favorite
}
