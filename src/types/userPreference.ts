import { User } from './user';

export type ReadingHabit = 'library_rat' | 'occasional_reader' | 'beginner_reader';
export type UsagePurpose = 'find_books' | 'find_community' | 'both';

export interface UserPreference {
    id: string;
    user_id: string;
    readingHabit: ReadingHabit;
    usagePurpose: UsagePurpose;
    createdAt: string;
    updatedAt: string;
    user: User;
}