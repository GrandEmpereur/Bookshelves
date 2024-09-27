import { User } from './user';

export interface UserGenre {
    id: string;
    user_id: string;
    genres: string[];
    createdAt: string;
    updatedAt: string;
    user: User;
}