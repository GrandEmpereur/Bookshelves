import { Post } from './post';
import { UserGenre } from './userGenre';
import { UserPreference } from './userPreference';

export interface User {
    id: string;
    username: string;
    email: string;
    birth_date: string;
    role: string;
    profile_picture: string;
    bio: string;
    is_verified: boolean;
    hasLoggedIn: boolean;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: string | null;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiresAt: string | null;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    posts?: Post[];
    preferences?: UserPreference[];
    genres?: UserGenre[];
}

export interface UserResponse {
    status: string;
    message?: string;
    data: User;
}

export interface UsersResponse {
    data: User[];
}
