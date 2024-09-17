// types/comment.ts

import { User } from './user';
import { Post } from './post';
import { Like } from './like';

// Typage pour un Commentaire
export interface Comment {
    id: string;                   // Identifiant unique du commentaire
    content: string;              // Contenu du commentaire
    userId: string;               // Identifiant de l'utilisateur qui a écrit le commentaire
    postId: string;               // Identifiant du post auquel le commentaire est lié
    parentCommentId: string | null; // Identifiant du commentaire parent (null si c'est un commentaire de niveau supérieur)
    likesCount: number;           // Nombre de likes sur le commentaire
    user: User;                   // Informations sur l'utilisateur qui a écrit le commentaire
    post: Post;                   // Informations sur le post auquel le commentaire est lié
    replies?: Comment[];          // Liste des réponses au commentaire (optionnel)
    likes?: Like[];               // Liste des likes sur le commentaire (optionnel)
    createdAt: string;            // Date de création du commentaire
    updatedAt: string;            // Date de dernière mise à jour du commentaire
}
